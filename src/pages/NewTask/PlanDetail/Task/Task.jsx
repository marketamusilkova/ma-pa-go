import {
  Button,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import './Task.css';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

export const Task = ({ tasks, onClick }) => {
  if (!tasks) {
    return <Spinner />;
  }

  return (
    <div>
      <Heading as="h2" size="lg" className="heading_task">
        Úkoly
      </Heading>
      <UnorderedList>
        {tasks.map((task) => (
          <div key={task.$$id} className="task">
            <div>
              <ListItem>{task.title}</ListItem>
            </div>
            <div>
              {' '}
              <Text> {task.date ? `datum: ${task.date}` : null}</Text>
            </div>
            <div>
              <Button
                bg="yellow.500"
                color="white"
                size={{ base: 'sm', lg: 'md' }}
              >
                <ChakraLink as={ReactRouterLink} to={`/task/${task.$$id}/edit`}>
                  <EditIcon />
                </ChakraLink>
              </Button>
              <Button
                bg="yellow.500"
                color="white"
                onClick={() => onClick(task.$$id)}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
        ))}
      </UnorderedList>
    </div>
  );
};
