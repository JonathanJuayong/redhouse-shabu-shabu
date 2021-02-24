import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { MdEmail, MdPerson } from "react-icons/md";
import { GlobalContext } from "../lib/context";
import { useFirestore } from "../lib/hooks";
import OrderConfirmationModal from "./OrderConfirmationModal";

interface CheckoutFormProps {}

const CheckoutForm: React.FC<CheckoutFormProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [branch, setBranch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { createOrder } = useFirestore();
  const {
    state: { user, cart },
    dispatch,
  } = useContext(GlobalContext);
  const toast = useToast();
  const handler = (regex, limit, setter) => (e) => {
    const value = e.target.value as string;
    if (value.length === limit + 1) return;
    if (value === "" || value.match(regex)) setter(value);
  };
  const nameRegex = /^[a-zA-z ]+$/;
  const numberRegex = /^[0-9]+$/;
  const nameHandler = handler(nameRegex, 80, setName);
  const phoneNumberHandler = handler(numberRegex, 10, setNumber);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (number.length < 10) {
      const digit = number.length === 1 ? "digit" : "digits";
      toast({
        title: "Mobile Number Error",
        description: `Please enter a 10-digit number. Current number is only ${number.length} ${digit}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    // dispatch({
    //   type: "SET_USER",
    //   user: {
    //     uid: user?.uid,
    //     displayName: name,
    //     photoUrl: user?.photoUrl,
    //     email,
    //     phone: `+63${number}`,
    //   },
    // });
    // dispatch({
    //   type: "SET_BRANCH",
    //   branch,
    // });
    onOpen();
  };
  const handleProcessOrder = async () => {
    const orderConfirmationHandler = (id) => {
      router.push(`/confirmed?orderId=${id}`, "/checkout");
    };
    const userInfo = {
      name,
      email,
      number,
      uid: user?.uid || "",
    };
    createOrder(userInfo, cart, branch, orderConfirmationHandler);
  };
  useEffect(() => {
    if (user !== null) {
      setName(user?.displayName);
      setEmail(user?.email);
      setNumber(user?.phone);
    }
  }, []);
  return (
    <>
      <Grid gap="1em">
        <form onSubmit={onSubmitHandler}>
          <Grid gap="1em">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<MdPerson />} />
                <Input
                  placeholder="Juan Dela Cruz"
                  type="text"
                  value={name}
                  onChange={nameHandler}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<MdEmail />} />
                <Input
                  placeholder="juandelacruz@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Mobile Phone</FormLabel>
              <InputGroup>
                <Tooltip label="We need your phone number to confirm your order">
                  <InputLeftAddon children="+63" />
                </Tooltip>
                <Input
                  placeholder="9XXXXXXXXX"
                  type="tel"
                  value={number}
                  onChange={phoneNumberHandler}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="branch" isRequired>
              <FormLabel>Branch</FormLabel>
              <Select
                placeholder="Select your branch"
                onChange={(e) => setBranch(e.target.value as string)}
                value={branch}
              >
                <option value="AS Fortuna">A.S. Fortuna (Mandaue)</option>
                <option value="City Times Square">
                  City Times Square (Mandaue)
                </option>
                <option value="Cebu City">Cebu City (Cebu City)</option>
              </Select>
            </FormControl>
            <Button type="submit">Proceed</Button>
          </Grid>
        </form>
      </Grid>
      <OrderConfirmationModal
        handleProcessOrder={handleProcessOrder}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default CheckoutForm;
