import Header from "./Header";
import Footer from "./Footer";
import { Container, Grid, IconButton, useDisclosure } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import CartDrawer from "../Cart/CartDrawer";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <main className="main-container">
        <Header />
        {children}
        <Footer />
        <IconButton
          borderRadius="50px"
          p="2.5em 2em"
          position="fixed"
          bottom="5em"
          right="5em"
          aria-label="cart trigger"
          icon={<MdShoppingCart />}
          onClick={onOpen}
          colorScheme="green"
        />
        <CartDrawer isOpen={isOpen} onClose={onClose} />
      </main>
      <style jsx>{`
        .main-container {
          position: relative;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
};

export default Layout;
