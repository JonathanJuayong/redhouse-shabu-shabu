import { Box, Grid, Image, Skeleton, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../lib/context";
import { theme } from "../lib/theme";
import CartButton from "./CartButton";
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
  const [isImageLoading, setIsImageLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const { state } = useContext(GlobalContext);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const counterStyle = {
    opacity: isAddedToCart ? "1" : "0",
    transform: isAddedToCart ? "translateY(0)" : "translateY(10px)",
  };
  let isAlreadyAdded;
  const onImageLoadedHandler = () => {
    setIsImageLoading(false);
  };

  //todo: refactor useEffect code
  useEffect(() => {
    isAlreadyAdded =
      typeof state.cart.find((item) => item.code === code) !== "undefined";
    setIsAddedToCart(isAlreadyAdded);
  }, [state.cart]);

  useEffect(() => {
    const imageCurrentElement = imageRef.current;
    if (imageCurrentElement && imageCurrentElement.complete) {
      onImageLoadedHandler();
    }
  }, [imageRef]);

  return (
    <Grid justifyContent="center" gap="1em" w="100%">
      <Box>
        {isImageLoading && <Skeleton w="100%" h="100%" />}
        <Image
          ref={imageRef}
          loading="lazy"
          w="230px"
          h="154px"
          onLoad={onImageLoadedHandler}
          src={imageURL}
          alt={name}
          fallback={<Skeleton w="100%" h="100%" />}
        />
      </Box>
      {/* <Link scroll={false} href={`/?code=${code}`} as={`/products/${code}`}>
      </Link> */}
      <Box>
        <Text fontFamily="lusitana, serif" fontWeight="700" fontSize="1.2rem">
          {name}
        </Text>
        <Text color={theme.colors.gray[500]}>PHP {price}.00</Text>
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
