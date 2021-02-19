import {
  Badge,
  Box,
  Grid,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { MdShoppingCart } from "react-icons/md";
import { GlobalContext } from "../../lib/context";
import { useAuthProvider } from "../../lib/hooks";

interface HeaderProps {
  onOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpen }) => {
  const { state } = useContext(GlobalContext);
  const cartCount = state.cart.length;
  const { googleSignIn, signOut } = useAuthProvider();
  const authText = state.user ? "SIGN OUT" : "SIGN IN";
  const authHandler = state.user ? signOut : googleSignIn;
  return (
    <Grid
      alignContent="center"
      gap="1em"
      zIndex={4}
      h="15vh"
      alignItems="center"
      justifyContent="center"
      position="sticky"
      top="0"
      background="white"
      mb="2em"
    >
      <Box justifySelf="center">Redhouse Shabu Shabu</Box>
      <HStack justifySelf="center" spacing="2em" as="ul" listStyleType="none">
        <li>
          <Link href="/">
            <a>HOME</a>
          </Link>
        </li>
        <li>
          <Link href="/shop">
            <a onClick={authHandler}>{authText}</a>
          </Link>
        </li>
        <li>
          <Box position="relative">
            <IconButton
              borderRadius="50px"
              aria-label="cart drawer"
              icon={<MdShoppingCart />}
              onClick={onOpen}
            />
            <Badge
              borderRadius="50px"
              top="0"
              right="-5px"
              position="absolute"
              colorScheme="green"
              transition="opacity .2s"
              opacity={cartCount > 0 ? 1 : 0}
            >
              {cartCount}
            </Badge>
          </Box>
        </li>
      </HStack>
    </Grid>
  );
};

export default Header;
