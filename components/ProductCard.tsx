import {
  Box,
  Button,
  Grid,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

interface ProductCardProps {}

const ProductCard: React.FC<ProductCardProps> = () => {
  return (
    <Grid justifyContent="center" gap="1em">
      <Box>
        <Image src="/images/k01_lobster_ball.png" alt="lobster ball" />
      </Box>
      <Box>
        <Text>Lobster Ball</Text>
        <Text>PHP 425.00</Text>
      </Box>
      <HStack justify="center">
        <IconButton
          borderRadius="50px"
          background="none"
          aria-label="minus button"
          icon={<HiMinusCircle />}
        />
        <Text>1</Text>
        <IconButton
          borderRadius="50px"
          background="none"
          aria-label="plus button"
          icon={<HiPlusCircle />}
        />
      </HStack>
      <Button rightIcon={<MdAddShoppingCart />}>Add to cart</Button>
    </Grid>
  );
};

export default ProductCard;
