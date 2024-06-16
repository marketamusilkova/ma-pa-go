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
  Box,
  Card,
  CardHeader,
  Divider,
  CardBody,
  Heading,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { appendUser } from '../../../library/api';

export const Notifications = () => {
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (zipCode && email) {
      await appendUser({ zipcode: zipCode, email: email });
      setEmail('');
      setZipCode('');
      onClose();
    } else {
      setError('Prosím, vyplň obě pole.');
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size={{ base: 'md', md: 'lg' }}>
            Bude dneska pršet? Mám si brát deštník?
          </Heading>
        </CardHeader>
        <Divider color="yellow.500" />
        <CardBody>
          <Text fontSize={{ base: 'md', lg: 'xl' }} mb="1rem">
            Nech si poslat každé ráno upozornění.
          </Text>
          <Button bg="blackAlpha.900" color="white" onClick={onOpen}>
            <EmailIcon />
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chceš vědět, jestli dnes bude pršet?</ModalHeader>
          <Stack direction={{ base: 'column', md: 'row' }} p="1.5rem">
            <Text fontSize="sm">
              Déšť už tě nepřekvapí. Zadej níže poštovní směrovací číslo
              oblasti, pro kterou tě zajímá informace o dešti, a svůj email.
              Pokud předpověď počasí bude ukazovat déšť, v daný den ráno ti
              dorazí email, aby sis nezapomněl/a vzít deštník...
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
                focusBorderColor="yellow.500"
              />
              <FormLabel mt="1rem">Zadej email</FormLabel>
              <Input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                focusBorderColor="yellow.500"
              />
              {error && (
                <Text color="yellow.500" mt="1rem">
                  {error}
                </Text>
              )}
              <Button
                bg="blackAlpha.900"
                color="white"
                type="submit"
                mt="1rem"
                mb="1rem"
              >
                Přihlaš se k notifikacím{' '}
                <Box as="span" ml="2">
                  <EmailIcon />
                </Box>
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
