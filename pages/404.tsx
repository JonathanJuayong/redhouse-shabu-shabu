import { Text } from "@chakra-ui/react";
import Link from "next/link";

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  return (
    <main>
      <Text as="h1">Error 404: Page not found</Text>
      <Text as="p">
        Oops... Looks like you tried to access a non-existing page. Click below
        to get back to shop
      </Text>
      <Link href="/shop">SHOP</Link>
    </main>
  );
};

export default ErrorPage;
