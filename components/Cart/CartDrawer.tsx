import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { GlobalContext } from "../../lib/context";
import CartItemContainer from "./CartItemContainer";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const {
    state: { cart },
  } = useContext(GlobalContext);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart:</DrawerHeader>
          <DrawerBody>
            <CartItemContainer />
          </DrawerBody>
          <DrawerFooter>
            {cart.length > 0 && (
              <Button
                w="100%"
                colorScheme="green"
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CartDrawer;
