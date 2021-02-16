import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import { GlobalContextProvider } from "../lib/context";
import Layout from "../components/Layout";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <GlobalContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContextProvider>
    </ChakraProvider>
  );
};

export default MyApp;
