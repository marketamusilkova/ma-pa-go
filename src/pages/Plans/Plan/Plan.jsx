import { deletePlan, updateTask } from '../../../library/api';
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Reorder } from 'framer-motion';
import { useState } from 'react';

export const Plan = ({ plan, onDelete, tasks }) => {
  const [orderedTasks, setOrderedTasks] = useState(tasks.sort((a, b) => a.order - b.order));

  const handleDeleteClick = async () => {
    await deletePlan(plan.$$id);
    if (onDelete) {
      onDelete();
    }
  };

  const handleReorder = (newOrder) => {
    setOrderedTasks(newOrder);
    newOrder.forEach(async (task, index) => {
      await updateTask(task.$$id, { ...task, order: index });
    });
  };

  return (
    <Card key={plan.$$id} w={{ lg: '33%' }}>
      <CardBody>
        <Stack h="100%">
          <Heading as="h1" size={{ base: 'sm', lg: 'md' }}>
            {plan.title}
          </Heading>
          <Text>{plan.description}</Text>
          <Stack className="plan_action" direction="row" justifyContent={'end'}>
            <Button size={{ base: 'sm', lg: 'md' }}>
              <ChakraLink as={ReactRouterLink} to={`/plan/${plan.$$id}/edit`}>
                <EditIcon />
              </ChakraLink>
            </Button>
            <Button
              type="button"
              onClick={handleDeleteClick}
              size={{ base: 'sm', lg: 'md' }}
            >
              <DeleteIcon />
            </Button>
          </Stack>

          <Divider />

          <Stack direction="column" justifyContent="space-between" h="100%">
            <Stack
              as={Reorder.Group}
              axis="y"
              values={orderedTasks}
              onReorder={handleReorder}
            >
              {orderedTasks.map((task) => (
                <Stack
                  key={task.$$id}
                  justifyContent="space-between"
                  spacing={2}
                  direction={'row'}
                  as={Reorder.Item}
                  value={task}
                  dragTransition={{
                    bounceStiffness: 600,
                  }}
                  initial="notDragging"
                  whileDrag="dragging"
                  position="relative"
                  cursor="move"
                >
                  <Checkbox colorScheme="red">{task.title}</Checkbox>
                  <Button size={{ base: 'sm', lg: 'md' }}>
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/task/${task.$$id}/edit`}
                    >
                      <EditIcon />
                    </ChakraLink>
                  </Button>
                </Stack>
              ))}
            </Stack>
            <Button>
              <ChakraLink as={ReactRouterLink} to={`/newtask`}>
                Přidat úkol <PlusSquareIcon mx="2px" />
              </ChakraLink>
            </Button>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
