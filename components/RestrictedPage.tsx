import { Button, Container, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../lib/context";
import { auth } from "../lib/firebase";
import { useFirestore } from "../lib/hooks";

interface RestrictedPageProps {
  children: JSX.Element | Array<JSX.Element>;
}

const RestrictedPage: React.FC<RestrictedPageProps> = ({ children }) => {
  const {
    state: { user },
  } = useContext(GlobalContext);
  const router = useRouter();
  const { checkIfAdmin } = useFirestore();
  const [isAllowed, setIsAllowed] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const isAdmin = await checkIfAdmin(user.uid);
        if (!isAdmin) return;
        setIsAllowed(true);
      }
    });
    return unsubscribe;
  }, []);
  if (!isAllowed)
    return (
      <Container py="4em">
        <Grid gap="2em" justifyContent="center">
          <Text>You must be an admin to access this page</Text>
          <Button onClick={() => router.push("/")}>Go back to home page</Button>
        </Grid>
      </Container>
    );
  return <>{children}</>;
};

export default RestrictedPage;
