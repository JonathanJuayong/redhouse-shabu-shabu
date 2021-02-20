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

interface HomePageProps {
  products;
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  const router = useRouter();
  const { code } = router.query;
  const { state, dispatch } = useContext(GlobalContext);
  const onClose = () => {
    router.push("/");
  };
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
          {/* <pre>{JSON.stringify(state.products, null, 2)}</pre> */}
        </div>
        <ProductCardContainer products={products} />
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
