import { Button, Container, Grid, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GlobalContext } from "../lib/context";
import { useAuthProvider } from "../lib/hooks";

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  const { state } = useContext(GlobalContext);
  const { signOut } = useAuthProvider();
  const router = useRouter();
  const signOutHandler = () => {
    const onSuccess = () => router.push("/");
    signOut(onSuccess);
  };
  if (state.user !== null)
    return (
      <Container>
        <Grid gap="2em">
          <Text>You are now signed in</Text>
          <Button onClick={signOutHandler}>Sign out</Button>
        </Grid>
      </Container>
    );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { googleSignIn } = useAuthProvider();

  const googleSignInHandler = () => {
    setError("");
    setLoading(true);
    const onSuccess = () => {
      setLoading(false);
      router.push("/");
    };
    const onError = (error) => {
      setLoading(false);
      setError(error?.message);
    };
    googleSignIn(onSuccess, onError);
  };

  return (
    <Container h="70vh">
      <Grid gap="2em">
        <Button
          onClick={googleSignInHandler}
          colorScheme="red"
          variant="outline"
          rightIcon={<FcGoogle />}
        >
          {loading ? <Spinner /> : "Sign in via Google"}
        </Button>
      </Grid>
    </Container>
  );
};

export default SignInPage;
