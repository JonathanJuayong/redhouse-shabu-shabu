import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import { GlobalContextProvider } from "../lib/context";
import Layout from "../components/Layout";
import { theme } from "../lib/theme";
import Head from "next/head";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Lusitana:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <GlobalContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalContextProvider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;

export const reportWebVitals = (metric) => {
  // console.log(metric);
};
