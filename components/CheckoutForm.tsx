import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdPerson } from "react-icons/md";

interface CheckoutFormProps {}

const CheckoutForm: React.FC<CheckoutFormProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const toast = useToast();
  const handler = (regex, limit, setter) => (e) => {
    const value = e.target.value as string;
    if (value.length === limit + 1) return;
    if (value === "" || value.match(regex)) setter(value);
  };
  const nameRegex = /^[a-zA-z]+$/;
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
  };
  return (
    <Grid gap="1em">
      {/* <Button rightIcon={<FcGoogle />}>Sign in with Google</Button>
      <Text as="p">or</Text> */}
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
            <Select placeholder="Select your branch">
              <option value="asf">A.S. Fortuna (Mandaue)</option>
              <option value="cts">City Times Square (Mandaue)</option>
              <option value="ceb">Cebu City (Cebu City)</option>
            </Select>
          </FormControl>
          <Button type="submit">Proceed</Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default CheckoutForm;
