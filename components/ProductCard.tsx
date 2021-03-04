import { Box, Grid, Image, Skeleton, Text } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../lib/context";
import { theme } from "../lib/theme";
import CartButton from "./CartButton";
import QtyCounter from "./QtyCounter";

interface ProductCardProps {
  code: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ code }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const {
    state: { cart, products },
  } = useContext(GlobalContext);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const counterStyle = {
    opacity: isAddedToCart ? "1" : "0",
    transform: isAddedToCart ? "translateY(0)" : "translateY(10px)",
  };
  const onImageLoadedHandler = () => {
    setIsImageLoading(false);
  };
  const product = products.find((item) => item.code === code);
  const productDetails = {
    name: product?.name,
    price: product?.price,
    imageURL: product?.imageSmall,
  };

  //todo: refactor useEffect code
  let isAlreadyAdded;
  useEffect(() => {
    isAlreadyAdded =
      typeof cart.find((item) => item.code === code) !== "undefined";
    setIsAddedToCart(isAlreadyAdded);
  }, [cart]);

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
          src={productDetails.imageURL}
          alt={productDetails.name}
          fallback={<Skeleton w="100%" h="100%" />}
        />
      </Box>
      <Box>
        <Text fontFamily="lusitana, serif" fontWeight="700" fontSize="1.2rem">
          {productDetails.name}
        </Text>
        <Text color={theme.colors.gray[500]}>
          PHP {productDetails.price}.00
        </Text>
      </Box>
      <Box style={counterStyle} transition="all .2s">
        <QtyCounter code={code} />
      </Box>
      <CartButton
        code={code}
        isAddedToCart={
          typeof cart.find((item) => item.code === code) !== "undefined"
        }
      />
    </Grid>
  );
};

export default ProductCard;
