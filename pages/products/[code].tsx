import { Container } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import ProductDescription from "../../components/ProductDescription";
import { mock } from "../../lib/mock";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const router = useRouter();
  const { code } = router.query;
  const item = mock.find(
    (item) => item.code === (code as string)?.toUpperCase()
  );
  const itemExists = typeof item !== "undefined";
  return (
    <Container maxW="6xl">
      {itemExists ? (
        <ProductDescription code={(code as string)?.toUpperCase()} />
      ) : (
        <h2>Sorry that item does not exist.</h2>
      )}
    </Container>
  );
};

export default ProductPage;
