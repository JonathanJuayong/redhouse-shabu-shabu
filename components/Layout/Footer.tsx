import { Box } from "@chakra-ui/react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <Box position="absolute" bottom="0">
      this is the footer
    </Box>
  );
};

export default Footer;
