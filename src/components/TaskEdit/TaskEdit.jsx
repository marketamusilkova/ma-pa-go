import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
} from '@chakra-ui/react';
import toys_story from './Toys_story.jpg';
import { getTask, updateTask } from '../../library/api';
import { Spinner } from '../Spinner/Spinner';

export const TaskEdit = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const loadTask = async () => {
    const task = await getTask(taskId);
    setTask(task);
    setTitle(task.title || '');
    setDate(task.date || '');
  };

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateTask(taskId, { plan: task.plan, title, date });
    navigate('/plans');
  };

  if (!task) {
    return <Spinner />;
  }

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p="1rem">
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Image
          maxW={{ md: '50%' }}
          src={toys_story}
          alt="Toys Story"
          borderRadius="lg"
        />
        <Box minW={{ md: '45%' }} p={{ md: '10px' }}>
          <form onSubmit={handleSubmit}>
            <Stack p={{ md: '20px' }} spacing="20px">
              <Heading as="h2" size="xl" alignSelf="center" mb={{ md: '10px' }}>
                Úprava úkolu
              </Heading>
              <div>
                <FormLabel>Chceš změnit název?</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div>
                <FormLabel>
                  Nebo chceš změnit datum? <small>(nepovinné)</small>
                </FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <Button
                bg="yellow.500"
                color="white"
                type="submit"
                alignSelf="center"
              >
                Upravit
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Card>
  );
};
