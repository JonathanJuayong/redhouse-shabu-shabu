import { Box, Grid, HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Grid
      zIndex={4}
      h="10vh"
      alignItems="center"
      justifyContent="center"
      position="sticky"
      top="0"
      background="white"
      mb="2em"
    >
      <Box>Redhouse Shabu Shabu</Box>
      <HStack justifySelf="center" spacing="2em" as="ul" listStyleType="none">
        <li>
          <Link href="/">
            <a>HOME</a>
          </Link>
        </li>
        <li>
          <Link href="/shop">
            <a>SHOP</a>
          </Link>
        </li>
      </HStack>
    </Grid>
  );
};

export default Header;
