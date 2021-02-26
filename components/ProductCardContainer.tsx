import {
  Box,
  Center,
  Divider,
  Grid,
  IconButton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { theme } from "../lib/theme";
import Carousel from "./Carousel";

interface ProductCardContainerProps {
  category;
  products;
}

const ProductCardContainer: React.FC<ProductCardContainerProps> = ({
  category,
  products,
}) => {
  const [isBiggerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <Center as={Text} fontFamily={theme.fonts.display} fontSize="3rem">
        {category}
      </Center>
      {isBiggerThan768 ? (
        <Box
          mb="8em"
          position="relative"
          maxW={["98vw", , , "65vw"]}
          m="0 auto"
        >
          <Divider bg={theme.colors.gray[300]} size="md" mb="2em" />
          <Grid
            gap="2em"
            margin="0 auto"
            pb="10em"
            maxW="65vw"
            justifyContent="center"
            overflowX="hidden"
            gridAutoFlow="row"
            gridTemplateColumns="repeat(auto-fill, 230px)"
          >
            {products.map((product) => (
              <Box
                id={product.code}
                key={product.code}
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
          </Grid>
        </Box>
      ) : (
        <Carousel length={products.length}>
          {products.map((product) => (
            <ProductCard
              key={product.code}
              code={product.code}
              name={product.name}
              imageURL={product.imageSmall}
              price={product.price}
            />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCardContainer;
