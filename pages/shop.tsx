import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import ProductCardContainer from "../components/ProductCardContainer";
import ProductDescription from "../components/ProductDescription";
import { GlobalContext } from "../lib/context";

interface ShopPageProps {}

const ShopPage: React.FC<ShopPageProps> = () => {
  const router = useRouter();
  const { code } = router.query;
  const { state } = useContext(GlobalContext);
  const onClose = () => {
    router.push("/shop");
  };
  return (
    <>
      <main>
        <div className="debug">
          {/* <h3>Debug:</h3> */}
          {/* <pre>{JSON.stringify(router.query, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
        </div>
        <ProductCardContainer />
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

export default ShopPage;
