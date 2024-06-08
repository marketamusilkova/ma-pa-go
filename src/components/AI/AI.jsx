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
          <DrawerHeader>Co tě zajímá?</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Piš sem..." />
          </DrawerBody>

          <form onSubmit={handleSubmit}>
            <FormLabel>Na co se chceš zeptat AI?</FormLabel>
            <Input
              type="text"
              value={aiquestion}
              onChange={(event) => setAiquestion(event.target.value)}
            />
            <Button type="submit">Odešli svou otázku</Button>
          </form>
          <div>{aianswer}</div>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Zavřít
            </Button>
            <Button colorScheme="blue">Zeptej se</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
