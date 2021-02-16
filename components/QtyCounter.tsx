import { HStack, IconButton, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { GlobalContext } from "../lib/context";

interface QtyCounterProps {
  code: string;
  isAddedToCart: boolean;
}

const QtyCounter: React.FC<QtyCounterProps> = ({ code, isAddedToCart }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const item = state.cart.find((item) => item.code === code) ?? {};
  const count = item?.qty || 1;
  const decrementCount = () => {
    if (count === 1) return;
    dispatch({
      type: "DECREMENT_QTY",
      code,
    });
  };
  const incrementCount = () => {
    dispatch({
      type: "INCREMENT_QTY",
      code,
    });
  };
  return (
    <HStack justify="center">
      <IconButton
        borderRadius="50px"
        background="none"
        aria-label="minus button"
        icon={<HiMinusCircle />}
        onClick={decrementCount}
      />
      <Text>{count}</Text>
      <IconButton
        borderRadius="50px"
        background="none"
        aria-label="plus button"
        icon={<HiPlusCircle />}
        onClick={incrementCount}
      />
    </HStack>
  );
};

export default QtyCounter;
