import {
  Box,
  Button,
  Collapse,
  Grid,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFirestore } from "../../lib/hooks";

interface ViewOrdersProps {}

export const ViewOrders: React.FC<ViewOrdersProps> = () => {
  const { getLatestOrders, getNextOrders } = useFirestore();
  const [items, setItems] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const [isEndOfListReached, setIsEndOfListReached] = useState(false);
  // const [openedRow, setOpenedRow] = useState(null);
  // const btnHandler = (id) => {
  //   return id === openedRow ? setOpenedRow(null) : setOpenedRow(id);
  // };
  // const getTotal = (arr) => {
  //   return arr.reduce((acc, cur) => {
  //     return (acc += cur.total);
  //   }, 0);
  // };

  const loadMoreOrders = async () => {
    if (isEndOfListReached) return;
    const { docs, lastDoc } = await getNextOrders(lastDocument, 4);
    setItems((prev) => [...prev, ...docs]);
    setLastDocument(lastDoc);
    if (docs.length < 3) setIsEndOfListReached(true);
  };

  useEffect(() => {
    const getLatestOrdersAsync = async () => {
      const { docs, lastDoc } = await getLatestOrders(4);
      console.log(docs);
      setLastDocument(lastDoc);
      setItems(docs);
    };

    getLatestOrdersAsync();
  }, []);
  return (
    <Grid>
      <Box></Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Branch</Th>
            <Th>Status</Th>
            <Th>Timestamp</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Mobile</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, i) => (
            <Tr key={`${item?.id}-${i}`}>
              <Td>{item?.id}</Td>
              <Td>{item?.branch}</Td>
              <Td>{item?.status}</Td>
              <Td>
                {new Date(item?.timestamp?.seconds * 1000).toLocaleString()}
              </Td>
              <Td>{item?.user?.name}</Td>
              <Td>{item?.user?.email}</Td>
              <Td>{item?.user?.number}</Td>
              {/* <Td>
                <Button onClick={() => btnHandler(item.id)}>
                  View Details
                </Button>
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {!isEndOfListReached && (
        <Button onClick={loadMoreOrders}>Get More Orders</Button>
      )}
    </Grid>
  );
};
