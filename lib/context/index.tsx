import { Context, createContext, Dispatch, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { loadLocalStorage, saveToLocalStorage } from "../utils";
import reducer from "./reducer";

interface UserType {
  uid: string;
  photoURL: string;
  displayName: string;
  photoUrl: string;
  email: string;
  phone: string;
}

interface InitialState {
  user: UserType | null;
  cart: any | null;
  branch: string | null;
}
interface GlobalContextType {
  state: InitialState;
  dispatch: Dispatch<any>;
}

interface GlobalContextProviderProps {
  children: JSX.Element;
}

const initialState: InitialState = {
  user: null,
  cart: [],
  branch: null,
};

export const GlobalContext: Context<GlobalContextType | null> = createContext(
  null
);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //set up user observer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        dispatch({
          type: "SET_USER",
          user: {
            uid,
            displayName,
            photoURL,
            email,
            phone: "",
          },
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return unsubscribe;
  }, []);

  //load cart from localstorage on mount
  useEffect(() => {
    const cart = loadLocalStorage("cart");
    dispatch({
      type: "SET_CART",
      payload: cart,
    });
  }, []);

  //save cart to localstorage on cart change
  useEffect(() => {
    saveToLocalStorage(state.cart, "cart");
  }, [state.cart]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
