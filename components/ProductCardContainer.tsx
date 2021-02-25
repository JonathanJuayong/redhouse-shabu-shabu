import { Box, Grid, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

interface ProductCardContainerProps {
  category;
  products;
}

const ProductCardContainer: React.FC<ProductCardContainerProps> = ({
  category,
  products,
}) => {
  return (
    <Grid gap="2em" mb="6em" position="relative">
      <Text justifySelf="center">{category}</Text>
      <Grid
        gap={["1em", , , "2em"]}
        margin="0 auto"
        pb="2em"
        maxW={["98vw", , , "65vw"]}
        justifyContent={["start", , , "center"]}
        gridTemplateColumns={[
          `30px repeat(${products.length}, 230px) 30px`,
          ,
          ,
          `repeat(auto-fill, 230px)`,
        ]}
        overflowX="auto"
        gridAutoFlow={["column", , , "row"]}
      >
        <Box display={["block", , , "none"]}></Box>
        {products.map((product) => (
          <ProductCard
            key={product.code}
            code={product.code}
            name={product.name}
            imageURL={product.imageSmall}
            price={product.price}
          />
        ))}
        <Box display={["block", , , "none"]}></Box>
      </Grid>
    </Grid>
  );
};

export default ProductCardContainer;
