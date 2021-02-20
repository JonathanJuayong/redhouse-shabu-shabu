import { Button, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../lib/context";

interface ConfirmedPageProps {}

const ConfirmedPage: React.FC<ConfirmedPageProps> = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { dispatch } = useContext(GlobalContext);
  useEffect(() => {
    dispatch({
      type: "SET_CART",
      payload: [],
    });
  }, []);
  return (
    <Grid>
      {router.pathname}
      <Text>Your order has been successfully submitted!</Text>
      <Text>Here is your confirmation code: {orderId as string}</Text>
      <Text>We will send you an email of your order.</Text>
      <Button colorScheme="green" onClick={() => router.push("/")}>
        Go back to shop
      </Button>
    </Grid>
  );
};

export default ConfirmedPage;
