import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleProcessOrder: () => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  handleProcessOrder,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirming your Order</ModalHeader>
        <ModalBody>Are you sure you want to proceed with your order?</ModalBody>
        <ModalFooter>
          <HStack>
            <Button colorScheme="green" onClick={handleProcessOrder}>
              Yes
            </Button>
            <Button variant="outline" onClick={onClose}>
              No
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderConfirmationModal;
