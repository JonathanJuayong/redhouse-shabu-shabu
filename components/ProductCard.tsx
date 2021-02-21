import {
  Box,
  Button,
  Grid,
  Image as ChakraImage,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { GlobalContext } from "../lib/context";
import CartButton from "./CartButton";
import QtyCounter from "./QtyCounter";
import Image from "next/image";

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
  const { state } = useContext(GlobalContext);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const counterStyle = {
    opacity: isAddedToCart ? "1" : "0",
    transform: isAddedToCart ? "translateY(0)" : "translateY(10px)",
  };
  let isInCart;

  //todo: refactor useEffect code
  useEffect(() => {
    isInCart =
      typeof state.cart.find((item) => item.code === code) !== "undefined";
    setIsAddedToCart(isInCart);
  }, [state.cart]);
  return (
    <Grid justifyContent="center" gap="1em" w="100%">
      <Link scroll={false} href={`/?code=${code}`} as={`/products/${code}`}>
        <Box cursor="pointer">
          <ChakraImage
            loading="lazy"
            w="250px"
            h="166px"
            src={imageURL}
            alt={name}
            fallback={<Skeleton w="100%" h="100%" />}
          />
        </Box>
      </Link>
      <Box>
        <Text>{name}</Text>
        <Text>PHP {price}.00</Text>
      </Box>
      <Box style={counterStyle} transition="all .2s">
        <QtyCounter code={code} />
      </Box>
      <CartButton
        code={code}
        isAddedToCart={
          typeof state.cart.find((item) => item.code === code) !== "undefined"
        }
      />
    </Grid>
  );
};

export default ProductCard;
