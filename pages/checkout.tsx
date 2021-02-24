import {
  Box,
  Button,
  Collapse,
  Grid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";
import { FaChevronLeft, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "../lib/context";
import Head from "next/head";

interface CheckoutPageProps {}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const router = useRouter();
  const {
    state: { cart },
  } = useContext(GlobalContext);
  const { isOpen, onToggle } = useDisclosure();
  const btnText = !isOpen ? "Hide Summary" : "Show Summary";
  const btnIcon = !isOpen ? <FaChevronUp /> : <FaChevronDown />;
  if (cart.length === 0)
    return (
      <>
        <Head>
          <title>Checkout | Redhouse Shabu-Shabu</title>
        </Head>
        <Grid
          h="100vh"
          margin="0 auto"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          gap="1em"
          w="30vw"
        >
          <Text>There are no items in your cart</Text>
          <Button colorScheme="green" onClick={() => router.push("/")}>
            Go back to shop
          </Button>
        </Grid>
      </>
    );
  return (
    <>
      <Head>
        <title>Checkout | Redhouse Shabu-Shabu</title>
      </Head>
      <Grid
        maxW="70vw"
        margin="0 auto"
        py="4em"
        gap="1em"
        gridTemplateColumns="repeat(auto-fit, minmax(34vw, 1fr))"
      >
        <Grid alignContent="start" gap="1em">
          <Button
            rightIcon={btnIcon}
            variant="link"
            onClick={onToggle}
            w="100%"
          >
            {btnText}
          </Button>
          <Collapse in={!isOpen} animateOpacity>
            <Box>
              <CheckoutSummary />
            </Box>
          </Collapse>
        </Grid>
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
      </Grid>
    </>
  );
};

export default CheckoutPage;
