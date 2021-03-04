import {
  Box,
  Grid,
  Image,
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
import Features from "../components/Features";
import MenuBanner from "../components/MenuBanner";

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
    const reducedProducts = products.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.category]: {
          ...acc[cur.category],
          [cur.code]: { ...cur },
        },
      };
    }, {});
    console.log(reducedProducts);
    dispatch({
      type: "SET_PRODUCTS",
      products,
    });
  }, []);
  return (
    <>
      <Head>
        <title>Order now | Red House Shabu-Shabu</title>
        <meta
          name="description"
          content="Red House Shabu-Shabu is now accepting online orders"
        />
      </Head>
      <Box mx={["2em", , , "5em"]}>
        <Hero />
        <Features />
      </Box>
      <MenuBanner />
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
