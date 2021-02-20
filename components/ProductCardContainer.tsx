import { Container, Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

interface ProductCardContainerProps {
  products;
}

const ProductCardContainer: React.FC<ProductCardContainerProps> = ({
  products,
}) => {
  return (
    <Grid
      gap="2.5em"
      margin="0 auto"
      maxW="70vw"
      justifyContent="center"
      gridTemplateColumns="repeat(auto-fill, minmax(250px, 250px))"
    >
      {products.map((product) => (
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
