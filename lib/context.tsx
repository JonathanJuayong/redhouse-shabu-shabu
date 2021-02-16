import { Context, createContext, Dispatch, useReducer } from "react";

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
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
        };
      case "ADD_TO_CART":
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      case "REMOVE_FROM_CART":
        const newCart = state.cart.filter((item) => {
          return item.code !== action.code;
        });
        return {
          ...state,
          cart: newCart,
        };
      default:
        throw new Error("Unrecognized action");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
