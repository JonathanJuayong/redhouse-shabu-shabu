import { Box, Button, Grid } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import { HomeComponent, ViewOrders, ViewProducts } from "../components/Admin";
import RestrictedPage from "../components/RestrictedPage";

interface AdmingPageProps {}

const MenuButton: React.FC<PropsWithChildren<any>> = ({
  children,
  ...props
}) => (
  <Button borderRadius="0px" variant="ghost" py="2em" {...props}>
    {children}
  </Button>
);

const AdmingPage: React.FC<AdmingPageProps> = () => {
  const [menuComponent, setMenuComponent] = useState(<HomeComponent />);
  return (
    <RestrictedPage>
      <Grid h="100vh" w="300px" left="0" alignContent="center" position="fixed">
        <MenuButton onClick={() => setMenuComponent(<HomeComponent />)}>
          Home
        </MenuButton>
        <MenuButton onClick={() => setMenuComponent(<ViewOrders />)}>
          View Orders
        </MenuButton>
        <MenuButton onClick={() => setMenuComponent(<ViewProducts />)}>
          View Products
        </MenuButton>
      </Grid>
      <Grid mx="1em" gridTemplateColumns="300px 1fr">
        <Box></Box>
        <Grid py="3em">{menuComponent}</Grid>
      </Grid>
    </RestrictedPage>
  );
};

export default AdmingPage;
