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
  FormLabel,
} from '@chakra-ui/react';
import './AI.css';
import React, { useState } from 'react';
import { run } from './AIAPI/AIAPI';

export const AI = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [aianswer, setAianswer] = useState('');
  const [aiquestion, setAiquestion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Funguju.');
    const answer = await run(aiquestion);
    setAianswer(answer);
  };

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        className="AIButton"
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
                placeholder="Piš sem..."
                type="text"
                value={aiquestion}
                onChange={(event) => setAiquestion(event.target.value)}
              /> 
              <div>{aianswer}</div>
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
