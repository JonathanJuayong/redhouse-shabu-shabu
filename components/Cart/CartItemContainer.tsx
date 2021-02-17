import { Grid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../../lib/context";
import CartItem from "./CartItem";

interface CartItemContainerProps {}

const CartItemContainer: React.FC<CartItemContainerProps> = () => {
  const { state } = useContext(GlobalContext);
  const cartCount = state.cart.length;
  return (
    <Grid gap="1em">
      {cartCount === 0 ? (
        <>
          <Text as="h3">Your Cart is Empty</Text>
          <Text as="p">You can add items by visiting the shop page</Text>
          <Link href="/shop">
            <a>Click Here</a>
          </Link>
        </>
      ) : (
        state.cart.map((item) => (
          <CartItem
            key={item.code}
            code={item.code}
            name={item.name}
            total={item.total}
            imageURL={item.imageURL}
          />
        ))
      )}
    </Grid>
  );
};

export default CartItemContainer;
