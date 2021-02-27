import { Button, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { GlobalContext } from "../../lib/context";
import CartItem from "./CartItem";

interface CartItemContainerProps {
  onClose: () => void;
}

const CartItemContainer: React.FC<CartItemContainerProps> = ({ onClose }) => {
  const router = useRouter();
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
          {state.cart.map((item) => (
            <CartItem
              key={item.code}
              code={item.code}
              name={item.name}
              total={item.total}
              imageURL={item.imageURL}
            />
          ))}
          <Text fontSize="1.5rem">Total: PHP {cartTotal}.00</Text>
          <Button
            colorScheme="green"
            onClick={() => {
              router.push("/checkout");
              onClose();
            }}
          >
            Checkout
          </Button>
        </>
      )}
    </Grid>
  );
};

export default CartItemContainer;
