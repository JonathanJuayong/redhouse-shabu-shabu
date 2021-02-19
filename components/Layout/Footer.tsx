import { Box, Grid } from "@chakra-ui/react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <Box h="30vh" mt="2.5em"></Box>
      <Grid
        bg="grey"
        w="100%"
        h="30vh"
        p="2em"
        px="10vw"
        position="absolute"
        bottom="0"
      >
        Redhouse Shabu-Shabu
      </Grid>
    </>
  );
};

export default Footer;
