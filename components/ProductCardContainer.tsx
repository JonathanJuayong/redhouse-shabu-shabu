import { Container, Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

interface ProductCardContainerProps {}

const ProductCardContainer: React.FC<ProductCardContainerProps> = () => {
  return (
    <Grid
      gap="1em"
      gridTemplateColumns="repeat(auto-fill, minmax(350px, 350px))"
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
