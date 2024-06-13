import {
  appenCheck,
  deletePlan,
  deleteTask,
  listCheckedStates,
  updateTask,
} from '../../../library/api';
import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Reorder, px } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Plan = ({ plan, onDelete, tasks }) => {
  const [orderedTasks, setOrderedTasks] = useState(
    tasks ? tasks.sort((a, b) => a.order - b.order) : [],
  );
  const [checkedTaskIds, setCheckedTaskIds] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchCheckedStates = async () => {
      const data = await listCheckedStates();
      setCheckedTaskIds(data.map((check) => check.taskId));
    };

    fetchCheckedStates();
  }, []);

  useEffect(() => {
    if (tasks) {
      setOrderedTasks(tasks.sort((a, b) => a.order - b.order));
    }
  }, [tasks]);

  const handleDeleteClick = async (e) => {
    await deletePlan(plan.$$id);
    if (onDelete) {
      onDelete();
    }
  };

  const handleDeleteTaskClick = async (id) => {
    await deleteTask(id);
    const newTasks = orderedTasks.filter((task) => task.$$id !== id);
    setOrderedTasks(newTasks);
  };

  const handleReorder = (newOrder) => {
    setOrderedTasks(newOrder);
    newOrder.forEach(async (task, index) => {
      await updateTask(task.$$id, { ...task, order: index });
    });
  };

  const handleCheckboxChange = async (taskId) => {
    const newCheckedTaskIds = checkedTaskIds.includes(taskId)
      ? checkedTaskIds.filter((id) => id !== taskId)
      : [...checkedTaskIds, taskId];

    setCheckedTaskIds(newCheckedTaskIds);

    await appenCheck({ taskId, checked: !checkedTaskIds.includes(taskId) });
  };

  return (
    <Card key={plan.$$id}>
      <CardBody>
        <Stack h="100%">
          <Heading as="h1" size={{ base: 'sm', lg: 'md' }}>
            {plan.title}
          </Heading>
          <Text>{plan.description}</Text>
          <Stack direction="row" justifyContent={'end'}>
            <Button
              bg="yellow.500"
              color="white"
              size={{ base: 'sm', lg: 'md' }}
            >
              <ChakraLink as={ReactRouterLink} to={`/plan/${plan.$$id}/edit`}>
                <EditIcon />
              </ChakraLink>
            </Button>
            <Button
              bg="yellow.500"
              color="white"
              type="button"
              size={{ base: 'sm', lg: 'md' }}
              onClick={onOpen}
            >
              <DeleteIcon />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Opravdu chceš tento plán smazat?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack direction="row" justifyContent="space-around" pb="4">
                    <Button
                      onClick={onClose}
                      bg="yellow.500"
                      color="white"
                      type="button"
                      size={{ base: 'sm', lg: 'md' }}
                    >
                      Nemazat
                    </Button>
                    <Button
                      onClick={handleDeleteClick}
                      bg="yellow.500"
                      color="white"
                      type="button"
                      size={{ base: 'sm', lg: 'md' }}
                    >
                      Smazat plán{' '}
                      <Box as="span" ml="2">
                        <DeleteIcon />
                      </Box>
                    </Button>
                  </Stack>
                </ModalBody>
              </ModalContent>
            </Modal>
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
                  <Checkbox
                    colorScheme="gray"
                    isChecked={checkedTaskIds.includes(task.$$id)}
                    onChange={() => handleCheckboxChange(task.$$id)}
                  >
                    {task.title}
                  </Checkbox>
                  <Stack justifyContent="end" spacing={2} direction={'row'}>
                    <Button
                      bg="yellow.500"
                      color="white"
                      size={{ base: 'sm', lg: 'md' }}
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
                      size={{ base: 'sm', lg: 'md' }}
                      onClick={() => handleDeleteTaskClick(task.$$id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Button
              bg="yellow.500"
              color="white"
              size={{ base: 'sm', lg: 'md' }}
            >
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
