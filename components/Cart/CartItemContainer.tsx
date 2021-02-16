import { useContext } from "react";
import { GlobalContext } from "../../lib/context";
import CartItem from "./CartItem";

interface CartItemContainerProps {}

const CartItemContainer: React.FC<CartItemContainerProps> = () => {
  const { state } = useContext(GlobalContext);
  return (
    <>
      {state.cart.map((item) => (
        <CartItem
          key={item.code}
          code={item.code}
          name={item.name}
          total={item.total}
        />
      ))}
    </>
  );
};

export default CartItemContainer;
