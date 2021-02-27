import Header from "./Header";
import Footer from "./Footer";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import CartDrawer from "../Cart/CartDrawer";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { GlobalContext } from "../../lib/context";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    state: { cart },
  } = useContext(GlobalContext);

  const route = useRouter();
  const { pathname } = route;
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (["/checkout", "/confirmed", "/admin"].includes(pathname))
    return <>{children}</>;
  return (
    <>
      <main className="main-container">
        <Header onOpen={onOpen} />
        {children}
        <Footer />
        <Box position="fixed" bottom="5vh" right="5vw">
          <Box position="relative">
            <IconButton
              transform={
                cart.length === 0 ? "translateY(50vh)" : "translateY(0)"
              }
              transition="all 0.2s ease"
              borderRadius="50px"
              p="2.5em 2em"
              aria-label="cart trigger"
              icon={<MdShoppingCart />}
              onClick={onOpen}
              colorScheme="orange"
            />
          </Box>
        </Box>
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
