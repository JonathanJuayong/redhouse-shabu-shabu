import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
