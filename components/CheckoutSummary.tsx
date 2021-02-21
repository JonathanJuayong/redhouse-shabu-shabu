import { Grid, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../lib/context";

interface CheckoutSummaryProps {}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = () => {
  const { state } = useContext(GlobalContext);
  const total = state.cart.reduce((acc, cur) => {
    return (acc += cur.total);
  }, 0);
  return (
    <Grid gap="1em" maxH="37vh" overflow="hidden" overflowY="scroll">
      <Table>
        <Thead>
          <Tr>
            <Th>Item:</Th>
            <Th>Qty:</Th>
            <Th>Subtotal:</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.cart.map((item) => (
            <Tr key={item.code}>
              <Td>{item.name}</Td>
              <Td>{item.qty}</Td>
              <Td>{item.total}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text justifySelf="center">TOTAL: {total}</Text>
    </Grid>
  );
};

export default CheckoutSummary;
