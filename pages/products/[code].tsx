import { Container } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import ProductDescription from "../../components/ProductDescription";
import { GlobalContext } from "../../lib/context";
import { useFirestore } from "../../lib/hooks";

interface ProductPageProps {
  products;
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const router = useRouter();
  const { code } = router.query;
  const { state, dispatch } = useContext(GlobalContext);
  const item =
    state.products.find(
      (item) => item.code === (code as string)?.toUpperCase()
    ) || {};
  const itemExists = typeof item !== "undefined";
  useEffect(() => {
    dispatch({
      type: "SET_PRODUCTS",
      products,
    });
  }, []);
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

export const getServerSideProps = async (context) => {
  const { getAllProducts } = useFirestore();
  const products = await getAllProducts();
  return {
    props: {
      products,
    },
  };
};
