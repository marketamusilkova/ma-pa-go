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
import React, { useState } from 'react';
import { run } from './AIAPI/AIAPI';
import { Spinner } from '../Spinner/Spinner';
import { SearchIcon } from '@chakra-ui/icons';

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
    setIsLoading(false);
  };

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="yellow"
        onClick={onOpen}
        pos="fixed"
        bottom="2rem"
        right="1rem"
        zIndex="1000"
        size={{ base: 'md', md: 'lg' }}
      >
        Zeptej se AI
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          onClose()
          setAianswer("")
          setAiquestion ("")
        } }
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <form onSubmit={handleSubmit}>
            <DrawerHeader> Na co se chceš zeptat AI?</DrawerHeader>

            <DrawerBody>
              <InputGroup>
                <Input
                  mb={7}
                  placeholder="Piš sem..."
                  type="text"
                  value={aiquestion}
                  onChange={(event) => setAiquestion(event.target.value)}
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
