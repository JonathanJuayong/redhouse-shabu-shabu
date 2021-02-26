import { Box, Center, Divider, Grid, IconButton, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { theme } from "../lib/theme";

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
  const [newProductIndex, setNewProductIndex] = useState(0);
  const selectedProductOpacity = (code) => {
    return code === productCodes[currentProductIndex] ? "1" : "0.35";
  };
  const scroll = () => {
    document.getElementById(productCodes[currentProductIndex]).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };
  const focusNextProduct = () => {
    if (currentProductIndex === productCodes.length - 1) return;
    setCurrentProductIndex((prev) => prev + 1);
    setNewProductIndex(currentProductIndex);
  };
  const focusPreviousProduct = () => {
    if (currentProductIndex === 0) return;
    setCurrentProductIndex((prev) => prev - 1);
    setNewProductIndex(currentProductIndex);
  };
  // const swipeHandlers = useSwipeable({
  //   onSwipedLeft: focusNextProduct,
  //   onSwipedRight: focusPreviousProduct,
  //   trackTouch: true,
  //   trackMouse: true,
  // });
  useEffect(() => {
    // prevent calling scroll() onMount
    // only after mounting
    if (currentProductIndex === newProductIndex) return;
    scroll();
  }, [currentProductIndex]);
  return (
    <Box mb="8em" position="relative" maxW={["98vw", , , "65vw"]} m="0 auto">
      <Center as={Text} fontFamily={theme.fonts.display} fontSize="3rem">
        {category}
      </Center>
      <Divider
        bg={theme.colors.gray[300]}
        size="md"
        // colorScheme="blackAlpha"
        mb="2em"
      />
      {products.length > 1 && (
        <IconButton
          zIndex="3"
          display={["flex", , , "none"]}
          colorScheme="orange"
          variant="outline"
          border="2px"
          borderRadius="50%"
          position="absolute"
          top="40%"
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
          colorScheme="orange"
          variant="outline"
          border="2px"
          borderRadius="50%"
          position="absolute"
          top="40%"
          right="10px"
          aria-label="right button"
          icon={<MdChevronRight />}
          onClick={focusNextProduct}
        />
      )}
      <Grid
        // {...swipeHandlers}
        gap={["1em", , , "2em"]}
        margin="0 auto"
        pb="10em"
        maxW={["98vw", , , "65vw"]}
        justifyContent={["start", , , "center"]}
        overflowX="hidden"
        gridAutoFlow={["column", , , "row"]}
        gridTemplateColumns={[
          `2em repeat(${products.length}, 230px) 2em`,
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
