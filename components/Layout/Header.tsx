import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useContext } from "react";
import { MdShoppingCart } from "react-icons/md";
import { GlobalContext } from "../../lib/context";
import { useAuthProvider } from "../../lib/hooks";
import { theme } from "../../lib/theme";

interface HeaderProps {
  onOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpen }) => {
  const router = useRouter();
  const { state } = useContext(GlobalContext);
  const cartCount = state.cart.length;
  const { signOut } = useAuthProvider();
  const signInComponent = () => (
    <Link href="/sign-in">
      <Button isActive={router.pathname === "/sign-in"} variant="link">
        SIGN IN
      </Button>
    </Link>
  );
  const signOutHandler = () => {
    const onSuccess = () => {};
    const onError = (e) => console.log(e);
    signOut(onSuccess, onError);
  };
  const signOutComponent = () => (
    <Text as="a" cursor="pointer" onClick={signOutHandler}>
      SIGN OUT
    </Text>
  );
  const authComponent = state.user ? signOutComponent() : signInComponent();
  return (
    <Grid
      borderBottom={`1px solid ${theme.colors.gray[300]}`}
      bgColor="inherit"
      alignContent="center"
      py="3em"
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
            <Button isActive={router.pathname === "/"} variant="link">
              HOME
            </Button>
          </Link>
        </li>
        <li>{authComponent}</li>
        <li>
          <Box position="relative">
            <IconButton
              borderRadius="50px"
              colorScheme="orange"
              aria-label="cart drawer"
              icon={<MdShoppingCart />}
              onClick={onOpen}
            />
            <Badge
              borderRadius="50px"
              top="0"
              right="-5px"
              position="absolute"
              colorScheme="pink"
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
