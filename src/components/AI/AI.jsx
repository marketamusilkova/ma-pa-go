import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Text,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { run } from './AIAPI/AIAPI';
import { Spinner } from '../Spinner/Spinner';

export const AI = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [aianswer, setAianswer] = useState('');
  const [aiquestion, setAiquestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log('Funguju.');
    const answer = await run(aiquestion);
    setAianswer(answer);
    setIsLoading(false);
  };

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="yellow"
        onClick={onOpen}
        pos="fixed"
        bottom="1rem"
        right="1rem"
        zIndex="1000"
      >
        Zeptej se AI
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <form onSubmit={handleSubmit}>
            <DrawerHeader> Na co se chceš zeptat AI?</DrawerHeader>

            <DrawerBody>
              <Input
                mb={7}
                placeholder="Piš sem..."
                type="text"
                value={aiquestion}
                onChange={(event) => setAiquestion(event.target.value)}
              />
              <Stack align="center">
                {isLoading === true ? <Spinner /> : <Text>{aianswer}</Text>}
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Zavřít
              </Button>
              <Button type="submit" colorScheme="blue">
                Zeptej se
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};
