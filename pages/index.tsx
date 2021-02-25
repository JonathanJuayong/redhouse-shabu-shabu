import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import ProductCardContainer from "../components/ProductCardContainer";
import ProductDescription from "../components/ProductDescription";
import { GlobalContext } from "../lib/context";
import Head from "next/head";
import { useFirestore } from "../lib/hooks";
import { getCategories } from "../lib/utils";

interface HomePageProps {
  products;
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  const router = useRouter();
  const { code } = router.query;
  const { dispatch } = useContext(GlobalContext);
  const onClose = () => {
    router.push("/");
  };
  const categories = getCategories(products);
  useEffect(() => {
    dispatch({
      type: "SET_PRODUCTS",
      products,
    });
  }, []);
  return (
    <>
      <Head>
        <title>Order now | Redhouse Shabu-Shabu</title>
      </Head>
      <main>
        <div className="debug">
          {/* <h3>Debug:</h3> */}
          {/* <pre>{JSON.stringify(router.query, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(state.user, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
        </div>
        {categories.map((category) => {
          const categorizedProduct = products.filter(
            (product) => product.category === category
          );
          return (
            <ProductCardContainer
              key={category}
              category={category}
              products={categorizedProduct}
            />
          );
        })}
      </main>
      <Modal isOpen={!!code} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody py="4em">
            <ProductDescription code={code as string} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <style jsx>{`
        .debug {
          position: fixed;
          z-index: 4;
        }
      `}</style>
    </>
  );
};

export default HomePage;

export const getServerSideProps = async (context) => {
  const { getAllProducts } = useFirestore();
  const products = await getAllProducts();
  return {
    props: {
      products,
    },
  };
};
