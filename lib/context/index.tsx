import { Context, createContext, Dispatch, useEffect, useReducer } from "react";
import { loadLocalStorage, saveToLocalStorage } from "../utils";
import reducer from "./reducer";

interface InitialState {
  user: any | null;
  cart: any | null;
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
};

export const GlobalContext: Context<GlobalContextType | null> = createContext(
  null
);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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