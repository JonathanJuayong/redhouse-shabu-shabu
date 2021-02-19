import { Button, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";

interface ConfirmedPageProps {}

const ConfirmedPage: React.FC<ConfirmedPageProps> = () => {
  const router = useRouter();
  const { orderId } = router.query;
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
