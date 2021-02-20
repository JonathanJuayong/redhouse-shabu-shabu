const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.products,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => {
          return item.code !== action.code;
        }),
      };
    case "INCREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.code === action.code) {
            return {
              ...item,
              qty: item.qty + 1,
              total: (item.qty + 1) * item.price,
            };
          } else {
            return item;
          }
        }),
      };
    case "DECREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.code === action.code) {
            return {
              ...item,
              qty: item.qty - 1,
              total: (item.qty - 1) * item.price,
            };
          } else {
            return item;
          }
        }),
      };
    case "SET_BRANCH":
      return {
        ...state,
        branch: action.branch,
      };
    default:
      throw new Error("Unrecognized action type");
  }
};

export default reducer;
