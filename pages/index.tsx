import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import ProductDescription from "../components/ProductDescription";
import { GlobalContext } from "../lib/context";
import Head from "next/head";
import { useFirestore } from "../lib/hooks";
import { getCategories } from "../lib/utils";
import dynamic from "next/dynamic";
import Hero from "../components/Hero";

const ProductCardContainer = dynamic(
  () => import("../components/ProductCardContainer"),
  {
    loading: () => <Spinner />,
  }
);

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
      </main>
      <Hero />
      <Box id="shop"></Box>
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

export const getStaticProps = async (context) => {
  const { getAllProducts } = useFirestore();
  const products = await getAllProducts();
  return {
    props: {
      products,
    },
  };
};
