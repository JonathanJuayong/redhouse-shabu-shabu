import { Grid, Image, Text } from "@chakra-ui/react";
import { theme } from "../lib/theme";

interface MenuBannerProps {}

const MenuBanner: React.FC<MenuBannerProps> = () => {
  return (
    <Grid
      id="menu"
      h="40vh"
      w="100%"
      bg={theme.colors.orange["500"]}
      alignItems="center"
      justifyContent="center"
      alignContent="center"
      mb="6em"
    >
      <Image
        m="0 auto"
        w={["50%", , , "100%"]}
        alt="菜單"
        src="/images/menu-chinese.svg"
      />
      <Text
        color="white"
        fontFamily={theme.fonts.display}
        textAlign="center"
        fontSize="2rem"
      >
        Menu
      </Text>
    </Grid>
  );
};

export default MenuBanner;
