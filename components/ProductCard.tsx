import {
  Box,
  Button,
  Grid,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { GlobalContext } from "../lib/context";
import QtyCounter from "./QtyCounter";

interface ProductCardProps {
  code: string;
  name: string;
  price: number;
  imageURL: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  code,
  name,
  price,
  imageURL,
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const { state, dispatch } = useContext(GlobalContext);
  const counterStyle = {
    opacity: isAddedToCart ? "1" : "0",
    transform: isAddedToCart ? "translateY(0)" : "translateY(10px)",
  };
  const btnText = isAddedToCart ? "Remove from Cart" : "Add to Cart";
  const btnVariant = isAddedToCart ? "outline" : "solid";
  const btnIcon = isAddedToCart ? (
    <MdRemoveShoppingCart />
  ) : (
    <MdAddShoppingCart />
  );
  const onClickHandler = () => {
    if (isAddedToCart) {
      dispatch({
        type: "REMOVE_FROM_CART",
        code,
      });
      setIsAddedToCart(false);
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          code,
          name,
          price,
          qty: 1,
          total: price,
        },
      });
      setIsAddedToCart(true);
    }
  };
  return (
    <Grid justifyContent="center" gap="1em" w="100%">
      <Box>
        <Image w="100%" src={imageURL} alt={name} />
      </Box>
      <Box>
        <Text>{name}</Text>
        <Text>PHP {price}.00</Text>
      </Box>
      <Box style={counterStyle} transition="all .2s">
        <QtyCounter code={code} isAddedToCart={isAddedToCart} />
      </Box>
      <Button
        colorScheme="green"
        variant={btnVariant}
        onClick={onClickHandler}
        rightIcon={btnIcon}
      >
        {btnText}
      </Button>
    </Grid>
  );
};

export default ProductCard;
