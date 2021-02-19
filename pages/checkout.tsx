import { Box, Button, FormControl, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import CartItemContainer from "../components/Cart/CartItemContainer";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";
import { FaChevronLeft } from "react-icons/fa";

interface CheckoutPageProps {}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const router = useRouter();
  return (
    <>
      <Grid
        maxW="70vw"
        margin="0 auto"
        py="4em"
        gap="1em"
        gridTemplateColumns="repeat(auto-fit, minmax(34vw, 1fr))"
      >
        <Grid gap="2em">
          <CheckoutForm />
          <Button
            leftIcon={<FaChevronLeft />}
            onClick={() => router.push("/")}
            variant="link"
          >
            Go back to shop
          </Button>
        </Grid>
        <CheckoutSummary />
      </Grid>
    </>
  );
};

export default CheckoutPage;
