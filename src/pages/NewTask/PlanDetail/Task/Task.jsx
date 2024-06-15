import {
  Button,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Spinner } from '../../../../components/Spinner/Spinner';

export const Task = ({ tasks, onClick }) => {
  if (!tasks) {
    return <Spinner />;
  }

  return (
    <Stack spacing={3}>
      <Heading size={{ base: 'lg', md: 'xl' }} mb={4}>
        Úkoly
      </Heading>
      <UnorderedList>
        <Stack>
        {tasks.map((task) => (
          <Stack key={task.$$id} direction="row" justify="space-between">
            <ListItem>{task.title}</ListItem>
            <Text> {task.date ? `datum: ${task.date}` : null}</Text>
            <Stack direction="row">
              <Button
                bg="yellow.500"
                color="white"
                size={{ base: 'sm', md: 'md' }}
              >
                <ChakraLink as={ReactRouterLink} to={`/task/${task.$$id}/edit`}>
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
        ))}</Stack>
      </UnorderedList>
    </Stack>
  );
};
