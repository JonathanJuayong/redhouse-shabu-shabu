import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { theme } from "../lib/theme";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const scrollToShop = () => {
    document.getElementById("menu").scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "start",
    });
  };
  return (
    <Flex
      ml={["0", , , "10em"]}
      justifyContent="center"
      alignItems={["center", , , "unset"]}
      flexDirection={["column", "column", "column", "row"]}
      minH="85vh"
    >
      <Box order={[2, , , 1]} mt={["0", "2em", "3em", "6em"]}>
        <Text
          mb=".5em"
          lineHeight="1.2"
          maxWidth={["20ch", , , "10ch"]}
          fontFamily={theme.fonts.display}
          fontSize={["2.3rem", "2.75rem", "3rem", "3.7rem"]}
        >
          Authentic Taiwan Hotpot
        </Text>
        <Text fontSize={["1rem", "", "", "1.5rem"]} mb="2em">
          Now Accepting Orders Online
        </Text>
        <Button
          onClick={scrollToShop}
          width="100%"
          colorScheme="orange"
          size="lg"
        >
          Check our menu
        </Button>
      </Box>
      <Image
        order={[1, , , 2]}
        alignSelf="center"
        maxW="749px"
        loading="eager"
        alt="Set A"
        srcSet={`/images/SETA-mobile.png 375w,
            /images/SETA-tablet.png 594w,`}
        sizes={`(max-width: 70em) 280px,
          (max-width: 80em) 550px,
          `}
      />
    </Flex>
  );
};

export default Hero;
