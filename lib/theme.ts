import { extendTheme } from "@chakra-ui/react";

const Button = {
  variants: {
    solid: {
      borderRadius: "0px",
    },
    outline: {
      border: "2px",
      borderRadius: "0px",
    },
  },
};

export const theme = extendTheme({
  styles: {
    global: {
      "h1, h2, h3, h4, h5, h6, p": {
        color: "#4B4845",
      },
      "html, body": {
        // backgroundColor: "#FBF1E7",
      },
    },
  },
  fonts: {
    display: "Lusitana, serif",
    body: "Lato, sans-serif",
  },

  components: {
    Button,
  },
});
