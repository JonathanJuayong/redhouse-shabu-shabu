import { Box, Button, Grid, Image, Text, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
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
  const { state, dispatch } = useContext(GlobalContext);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const toast = useToast();
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
      toast({
        title: "Removed from Cart",
        description: `${name} is now removed from your cart`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
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
      toast({
        title: "Added to Cart",
        description: `${name} is now added to your cart`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const isInCart =
      typeof state.cart.find((item) => item.code === code) !== "undefined";
    setIsAddedToCart(isInCart);
  }, [state.cart]);
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
        <QtyCounter code={code} />
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
