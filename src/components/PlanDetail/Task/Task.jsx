import {
  Box,
  Button,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Spinner } from '../../Spinner/Spinner';

export const Task = ({ tasks, onClick }) => {
  if (!tasks) {
    return <Spinner />;
  }

  return (
    <Stack spacing={3}>
      <Heading size={{ base: 'md', md: 'lg' }} mb={4} mt={4}>
        Úkoly
      </Heading>
      <UnorderedList>
        <Stack>
          {tasks.map((task) => (
            <Stack key={task.$$id} direction="row" justify="space-between">
              <Stack>
                <ListItem fontSize={{ base: 'md', md: 'xl' }}>
                  {task.title}
                </ListItem>
                <Text> {task.date ? `deadline: ${task.date}` : null}</Text>
              </Stack>
              <Stack direction="row">
                <Button
                  bg="yellow.500"
                  color="white"
                  size={{ base: 'sm', md: 'md' }}
                >
                  <ChakraLink
                    as={ReactRouterLink}
                    to={`/task/${task.$$id}/edit`}
                  >
                    <EditIcon />
                  </ChakraLink>
                </Button>
                <Button
                  bg="yellow.500"
                  color="white"
                  size={{ base: 'sm', md: 'md' }}
                  onClick={() => onClick(task.$$id)}
                >
                  <DeleteIcon />
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </UnorderedList>
      <Box>
        <Button bg="yellow.500" color="white" size={{ base: 'sm', lg: 'md' }}>
          <ChakraLink as={ReactRouterLink} to={`/newtask`}>
            Přidat úkol <PlusSquareIcon mx="2px" />
          </ChakraLink>
        </Button>
      </Box>
    </Stack>
  );
};
