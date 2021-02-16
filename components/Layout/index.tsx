import Header from "./Header";
import Footer from "./Footer";
import { Container, Grid } from "@chakra-ui/react";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
