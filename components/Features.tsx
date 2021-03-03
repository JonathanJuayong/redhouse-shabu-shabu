import {
  Box,
  Center,
  Circle,
  Flex,
  Grid,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { theme } from "../lib/theme";
import { GiBubblingBowl } from "react-icons/gi";
import { MdShoppingCart } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

interface FeaturesProps {}

const Features: React.FC<FeaturesProps> = () => {
  return (
    <Box py="2em">
      <Grid
        alignContent="center"
        minH="90vh"
        gap="4em"
        mb="4em"
        justifyItems="center"
      >
        <Box>
          <Text
            textAlign="center"
            fontFamily={theme.fonts.display}
            fontSize={["2rem", "2.5rem", "2.75rem", "3.4rem"]}
            lineHeight="1.2"
            mb=".5em"
          >
            You can now order online
          </Text>
          <Text mb="1em" fontSize="1rem">
            We are now currently accepting online{" "}
            <strong>dine-in and pick-up</strong> orders at the following
            branches:
          </Text>
          <UnorderedList ml="4em" mb="1em">
            <ListItem>AS Fortuna (Mandaue City)</ListItem>
            <ListItem>City Times Square (Mandaue City)</ListItem>
            <ListItem>Apitong (Cebu City)</ListItem>
          </UnorderedList>
          <Text>Simply follow the steps below to start.</Text>
        </Box>
        <Grid gap="8em" gridAutoFlow={["row", "row", "row", "column"]}>
          <VStack>
            <Box mb=".5em" fontSize="5em">
              <GiBubblingBowl />
            </Box>
            <Flex alignItems="start" maxW={["50ch", , , "30ch"]}>
              <Center mb="1em" mr="1em">
                <Circle
                  fontFamily={theme.fonts.display}
                  w="3em"
                  h="3em"
                  color="white"
                  bg={theme.colors.gray[800]}
                >
                  1
                </Circle>
              </Center>
              <Text>
                Pick and choose all your favorite Red House items from the shop
                below and then add them to your cart.
              </Text>
            </Flex>
          </VStack>
          <VStack>
            <Box mb=".5em" fontSize="5em">
              <MdShoppingCart />
            </Box>
            <Flex alignItems="start" maxW={["50ch", , , "30ch"]}>
              <Center mb="1em" mr="1em">
                <Circle
                  fontFamily={theme.fonts.display}
                  w="3em"
                  h="3em"
                  color="white"
                  bg={theme.colors.gray[800]}
                >
                  2
                </Circle>
              </Center>
              <Text>
                Proceed to checkout and fill out all the required details.{" "}
                <strong>Don't forget to choose the branch!</strong>
              </Text>
            </Flex>
          </VStack>
          <VStack>
            <Box mb=".5em" fontSize="5em">
              <FaPhoneAlt />
            </Box>
            <Flex alignItems="start" maxW={["50ch", , , "30ch"]}>
              <Center mb="1em" mr="1em">
                <Circle
                  fontFamily={theme.fonts.display}
                  w="3em"
                  h="3em"
                  color="white"
                  bg={theme.colors.gray[800]}
                >
                  3
                </Circle>
              </Center>
              <Text>
                You will be contacted by our staff via your mobile number to
                confirm your order. We look forward to serving you!
              </Text>
            </Flex>
          </VStack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;
