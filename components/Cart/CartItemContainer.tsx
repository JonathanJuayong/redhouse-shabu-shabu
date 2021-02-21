import { Grid, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../lib/context";
import CartItem from "./CartItem";

interface CartItemContainerProps {}

const CartItemContainer: React.FC<CartItemContainerProps> = () => {
  const { state } = useContext(GlobalContext);
  const cartCount = state.cart.length;
  const cartTotal = state.cart.reduce((acc, cur) => {
    return (acc += cur.total);
  }, 0);
  return (
    <Grid gap="2em" mb="2em">
      {cartCount === 0 ? (
        <>
          <Text as="h3">Your Cart is Empty</Text>
          <Text as="p">
            You can add items by clicking the Add to Cart button
          </Text>
        </>
      ) : (
        <>
          <Text as="h2">Total: PHP {cartTotal}.00</Text>
          {state.cart.map((item) => (
            <CartItem
              key={item.code}
              code={item.code}
              name={item.name}
              total={item.total}
              imageURL={item.imageURL}
            />
          ))}
        </>
      )}
    </Grid>
  );
};

export default CartItemContainer;
