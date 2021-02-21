import { Box, Grid, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../lib/context";
import CartButton from "./CartButton";
import QtyCounter from "./QtyCounter";

interface ProductDescriptionProps {
  code: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ code }) => {
  const { state } = useContext(GlobalContext);
  const item = state.products.find((item) => item.code === code);
  const { name, price, imageBig, category } = item || {};
  const isAddedToCart =
    typeof state.cart.find((item) => item.code === code) !== "undefined";
  const counterStyle = {
    opacity: isAddedToCart ? "1" : "0",
    transform: isAddedToCart ? "translateY(0)" : "translateY(10px)",
  };
  return (
    <Grid
      alignItems="center"
      justifyContent="center"
      gap="2em"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
    >
      <Box maxw="350px">
        {/* <Skeleton h={"350px"} w={"525px"} /> */}
        <Image fit="cover" src={imageBig} />
      </Box>
      <Grid py="1em">
        <Text>{category}</Text>
        <Text>{name}</Text>
        <Text>PHP {price}.00</Text>
        <Box my="1em" style={counterStyle} transition="all .2s">
          <QtyCounter code={code} />
        </Box>
        <CartButton code={code as string} isAddedToCart={isAddedToCart} />
      </Grid>
    </Grid>
  );
};

export default ProductDescription;
