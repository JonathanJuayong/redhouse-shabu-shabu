import { Container, Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { mock } from "../lib/mock";

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
      {mock.map((product) => (
        <ProductCard
          key={product.code}
          code={product.code}
          name={product.name}
          imageURL={product.imageSmall}
          price={product.price}
        />
      ))}
    </Grid>
  );
};

export default ProductCardContainer;
