import { Box, Grid, List, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <Box h="30vh" mt="2.5em" bg="grey" w="100%"></Box>
      <Grid
        h="30vh"
        m="0 auto"
        w="100%"
        p="2em"
        justifyItems="center"
        position="absolute"
        bottom="0"
      >
        <Text color="white" fontSize="1.2rem">
          Red House Taiwan Shabu-Shabu{" "}
          <Text verticalAlign="top" fontSize=".8rem" as="span">
            &#169; 2021
          </Text>
        </Text>
        <Grid gap="5em" gridAutoFlow="column">
          <Box>
            <Text fontWeight={700} color="white">
              Quick Links:
            </Text>
            <List color="white">
              <ListItem>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/sign-in">
                  <a>Sign in</a>
                </Link>
              </ListItem>
            </List>
          </Box>
          <Box>
            <Text fontWeight={700} color="white">
              Branches:
            </Text>
            <List color="white">
              <ListItem>Mandaue City</ListItem>
              <ListItem>Cebu City</ListItem>
              <ListItem>Davao City</ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
