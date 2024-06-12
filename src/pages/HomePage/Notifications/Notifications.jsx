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
  Stack,
  Image,
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
      <Button bg="blackAlpha.900" color="white" onClick={onOpen}>
        Bude dnes pršet?
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chceš vědět, jestli dnes bude pršet?</ModalHeader>
          <Stack direction="row" p="1.5rem">
            <Text fontSize="sm">
              Déšť už tě nepřekvapí. Zadej níže poštovní směrovací číslo, pro
              které Tě zajímá informace o dešti, a svůj email. Pokud předpověď
              počasí bude ukazovat déšť, v daný den ráno ti dorazí email, aby
              sis nezapomněla vzít deštník...
            </Text>
            <Image
              src="https://media.giphy.com/media/TvVcE5NOI46tlmblLR/giphy.gif?cid=790b7611jfh9imhxo744amefh8yq2n93zo3kgrg8jhuayi84&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              borderRadius="lg"
              maxW="40%"
            />
          </Stack>

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
              <Button
                bg="blackAlpha.900"
                color="white"
                type="submit"
                onClick={onClose}
                m="1rem"
              >
                Přihlaš se k notifikacím
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
