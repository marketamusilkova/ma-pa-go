import {
  Button,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import './Task.css';

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
              <Button onClick={() => onClick(task.$$id)}>Smazat</Button>
            </div>
          </div>
        ))}
      </UnorderedList>
    </div>
  );
};
