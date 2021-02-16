import Header from "./Header";
import Footer from "./Footer";
import { Container, Grid } from "@chakra-ui/react";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main className="main-container">
        <Header />
        {children}
        <Footer />
      </main>
      <style jsx>{`
        .main-container {
          position: relative;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
};

export default Layout;
