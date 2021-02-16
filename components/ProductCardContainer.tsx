import { Container, Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

interface ProductCardContainerProps {}

const ProductCardContainer: React.FC<ProductCardContainerProps> = () => {
  return (
    <Grid
      gap="2.5em"
      margin="0 auto"
      maxW="70vw"
      justifyContent="center"
      gridTemplateColumns="repeat(auto-fill, minmax(250px, 250px))"
    >
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Grid>
  );
};

export default ProductCardContainer;
