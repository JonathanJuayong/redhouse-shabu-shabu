import {
  Box,
  Grid,
  Image,
  List,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { theme } from "../../lib/theme";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <Box h="30vh" mt="2.5em" bg="grey" w="100%">
        <Grid
          h="30vh"
          m="0 auto"
          w={["100vw", , , "65vw"]}
          p="2em"
          // position="absolute"
          bottom="0"
        >
          <Text color="white" fontSize="1.2rem">
            Red House Taiwan Shabu-Shabu{" "}
            <Text verticalAlign="top" fontSize=".8rem" as="span">
              &#169; 2021
            </Text>
          </Text>
          <Grid gridAutoFlow="column">
            <Box>
              <Text fontWeight={700} color="white">
                Menu:
              </Text>
              <List color="white">
                <ListItem>Set</ListItem>
                <ListItem>Meat</ListItem>
                <ListItem>Seafood</ListItem>
                <ListItem>Vegetable</ListItem>
                <ListItem>Hotpot</ListItem>
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
      </Box>
    </>
  );
};

export default Footer;
