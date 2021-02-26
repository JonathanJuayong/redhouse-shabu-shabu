import { Button, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { GlobalContext } from "../lib/context";

interface CartButtonProps {
  isAddedToCart: boolean;
  code: string;
}

const CartButton: React.FC<CartButtonProps> = ({ isAddedToCart, code }) => {
  const toast = useToast();
  const { state, dispatch } = useContext(GlobalContext);
  const item = state.products.find((item) => item.code === (code as string));
  const { name, price, imageSmall } = item || {};
  const btnText = isAddedToCart ? "Remove from Cart" : "Add to Cart";
  const btnVariant = isAddedToCart ? "outline" : "solid";
  const btnIcon = isAddedToCart ? (
    <MdRemoveShoppingCart />
  ) : (
    <MdAddShoppingCart />
  );
  const onClickHandler = () => {
    if (isAddedToCart) {
      dispatch({
        type: "REMOVE_FROM_CART",
        code,
      });
      toast({
        title: "Removed from Cart",
        description: `${name}`,
        status: "warning",
        duration: 1500,
        isClosable: true,
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          code,
          name,
          price,
          qty: 1,
          total: price,
          imageURL: imageSmall,
        },
      });
      toast({
        title: "Added to Cart",
        description: `${name}`,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    }
  };
  return (
    <Button
      w="100%"
      // bgColor="#945142"
      // color="white"
      colorScheme="orange"
      variant={btnVariant}
      onClick={onClickHandler}
      rightIcon={btnIcon}
    >
      {btnText}
    </Button>
  );
};

export default CartButton;
