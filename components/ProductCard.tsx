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
  const [qty, setQty] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const { state, dispatch } = useContext(GlobalContext);
  const btnText = isAddedToCart ? "Remove from Cart" : "Add to Cart";
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
          qty,
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
      <HStack justify="center">
        <IconButton
          borderRadius="50px"
          background="none"
          aria-label="minus button"
          icon={<HiMinusCircle />}
        />
        <Text>1</Text>
        <IconButton
          borderRadius="50px"
          background="none"
          aria-label="plus button"
          icon={<HiPlusCircle />}
        />
      </HStack>
      <Button onClick={onClickHandler} rightIcon={btnIcon}>
        {btnText}
      </Button>
    </Grid>
  );
};

export default ProductCard;
