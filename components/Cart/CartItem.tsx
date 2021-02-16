import { Box, Button, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../lib/context";
import QtyCounter from "../QtyCounter";

interface CartItemProps {
  code: string;
  name: string;
  total: number;
}

const CartItem: React.FC<CartItemProps> = ({ code, name, total }) => {
  const { dispatch } = useContext(GlobalContext);
  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      code,
    });
  };
  return (
    <Grid>
      <Box></Box>
      <Grid>
        <Text>{name}</Text>
        <Text>PHP {total}.00</Text>
        <Box justifySelf="start">
          <QtyCounter code={code} />
        </Box>
        <Button onClick={removeFromCart}>Remove</Button>
      </Grid>
    </Grid>
  );
};

export default CartItem;
