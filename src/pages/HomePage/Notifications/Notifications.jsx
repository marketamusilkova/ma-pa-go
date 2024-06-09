import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { appendUser } from '../../../library/api';

export const Notifications = () => {
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await appendUser({ zipcode: zipCode, email: email });
    setEmail('');
    setZipCode('');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Bude dnes pršet?</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chceš vědět, jestli dneska bude pršet?</ModalHeader>
          <Text>
            Déšť už tě nepřekvapí. Zadej níže poštovní směrovací číslo, pro
            které Tě zajímá informace o dešti, a svůj email. Pokud předpověď
            počasí bude ukazovat déšť, v daný den ráno ti dorazí email, aby sis
            nezapomněla vzít deštník...
          </Text>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormLabel>Zadej PSČ (s mezerou, např. 550 01)</FormLabel>
              <Input
                type="text"
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
              />
              <FormLabel>Zadej email</FormLabel>
              <Input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button type="submit" onClick={onClose}>
                Přihlaš se k notifikacím
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};