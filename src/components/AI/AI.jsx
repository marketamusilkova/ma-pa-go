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
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ChatIcon, SearchIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { run } from './AIApi/AIApi';
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

    const answer = await run(aiquestion);
    setAianswer(answer);
    setAiquestion('');
    setIsLoading(false);
  };

  return (
    <>
      <Button
        ref={btnRef}
        bg="blackAlpha.900"
        color="white"
        onClick={onOpen}
        pos="fixed"
        bottom="2rem"
        right="1rem"
        zIndex="1000"
        size={{ base: 'md', md: 'lg' }}
        p={8}
      >
        <ChatIcon boxSize={8} />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          onClose();
          setAianswer('');
          setAiquestion('');
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <form onSubmit={handleSubmit}>
            <DrawerHeader>
              <Text
                fontSize={{ base: 'md', lg: 'xl' }}
                mt="2rem"
                fontWeight="400"
              >
                Zde se můžeš v podstatě na cokoli zeptat velmi chytré umělé
                inteligence. Jen mysli na to, že není připojena k internetu,
                tudíž nedokáže například stáhnout aktuální předpověď počasí.
              </Text>
            </DrawerHeader>

            <DrawerBody>
              <InputGroup>
                <Input
                  mb={7}
                  placeholder="Piš sem..."
                  type="text"
                  value={aiquestion}
                  onChange={(event) => setAiquestion(event.target.value)}
                  focusBorderColor="yellow.500"
                />
                <InputRightElement>
                  <SearchIcon />
                </InputRightElement>
              </InputGroup>
              <Stack align="center">
                {isLoading === true ? <Spinner /> : <Text>{aianswer}</Text>}
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button bg="blackAlpha.900" color="white" type="submit">
                Zeptej se
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};
