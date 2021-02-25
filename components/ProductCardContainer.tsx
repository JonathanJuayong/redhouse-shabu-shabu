import { Box, Center, Grid, IconButton, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface ProductCardContainerProps {
  category;
  products;
}

const ProductCardContainer: React.FC<ProductCardContainerProps> = ({
  category,
  products,
}) => {
  const productCodes = products.map((product) => product.code);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const focusNextProduct = () => {
    if (currentProductIndex === productCodes.length - 1) return;
    setCurrentProductIndex((prev) => prev + 1);
  };
  const focusPreviousProduct = () => {
    if (currentProductIndex === 0) return;
    setCurrentProductIndex((prev) => prev - 1);
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: focusNextProduct,
    onSwipedRight: focusPreviousProduct,
    trackTouch: true,
    trackMouse: true,
  });
  const selectedProductOpacity = (code) => {
    return code === productCodes[currentProductIndex] ? "1" : "0.35";
  };
  useEffect(() => {
    document.getElementById(productCodes[currentProductIndex]).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentProductIndex]);
  return (
    <Box mb="8em" position="relative" maxW={["98vw", , , "65vw"]} m="0 auto">
      <Center mb="2em">{category}</Center>
      {products.length > 1 && (
        <IconButton
          zIndex="3"
          display={["flex", , , "none"]}
          colorScheme="green"
          borderRadius="50%"
          position="absolute"
          top="30%"
          left="10px"
          aria-label="left button"
          icon={<MdChevronLeft />}
          onClick={focusPreviousProduct}
        />
      )}
      {products.length > 1 && (
        <IconButton
          zIndex="3"
          display={["flex", , , "none"]}
          colorScheme="green"
          borderRadius="50%"
          position="absolute"
          top="30%"
          right="10px"
          aria-label="right button"
          icon={<MdChevronRight />}
          onClick={focusNextProduct}
        />
      )}
      <Grid
        {...swipeHandlers}
        gap={["1em", , , "2em"]}
        margin="0 auto"
        pb="6em"
        maxW={["98vw", , , "65vw"]}
        justifyContent={["start", , , "center"]}
        overflowX="hidden"
        gridAutoFlow={["column", , , "row"]}
        gridTemplateColumns={[
          `4em repeat(${products.length}, 230px) 4em`,
          ,
          ,
          `repeat(auto-fill, 230px)`,
        ]}
      >
        <Box display={["block", , , "none"]}></Box>
        {products.map((product) => (
          <Box
            id={product.code}
            key={product.code}
            opacity={[selectedProductOpacity(product.code), , , 1]}
            transition="opacity .3s"
          >
            <ProductCard
              code={product.code}
              name={product.name}
              imageURL={product.imageSmall}
              price={product.price}
            />
          </Box>
        ))}
        <Box display={["block", , , "none"]}></Box>
      </Grid>
    </Box>
  );
};

export default ProductCardContainer;
