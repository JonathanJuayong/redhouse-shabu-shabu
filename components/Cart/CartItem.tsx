import {
  Box,
  Button,
  Grid,
  HStack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../lib/context";
import QtyCounter from "../QtyCounter";

interface CartItemProps {
  code: string;
  name: string;
  total: number;
  imageURL: string;
}

const CartItem: React.FC<CartItemProps> = ({ code, name, total, imageURL }) => {
  const { dispatch } = useContext(GlobalContext);
  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      code,
    });
  };
  return (
    <Grid gridAutoFlow="column">
      <Box w="250px">
        <Image w="100%" src={imageURL} />
      </Box>
      <Grid>
        <Text>{name}</Text>
        <Text>PHP {total}.00</Text>
        <QtyCounter code={code} />
        <Box justifySelf="start"></Box>
        <Button onClick={removeFromCart}>Remove</Button>
      </Grid>
    </Grid>
  );
};

export default CartItem;
