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
  Textarea,
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
    await updateTask(taskId, { plan: task.plan, title, date: date ? date : null});
    navigate('/plans');
  };

  if (!task) {
    return <Spinner />;
  }

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p={{ base: '1rem', md: '2rem' }}>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Box maxW={{ md: '50%' }}>
          <Image src={toys_story} alt="Toys Story" borderRadius="lg" />
        </Box>
        <Box minW={{ md: '45%' }} p={{ md: '10px' }}>
          <form onSubmit={handleSubmit}>
            <Stack p={{ md: '20px' }} spacing="20px">
              <Heading
                as="h2"
                size={{ base: 'lg', md: 'xl' }}
                alignSelf="center"
                mb={4}
              >
                Úprava úkolu
              </Heading>
              <div>
                <FormLabel fontSize={{ base: 'md', lg: 'xl' }}>
                  Chceš změnit název?
                </FormLabel>
                <Textarea
                  row={3}
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  bg="white"
                  focusBorderColor="yellow.500"
                />
              </div>
              <div>
                <FormLabel fontSize={{ base: 'md', lg: 'xl' }}>
                  Nebo chceš změnit datum? <small>(nepovinné)</small>
                </FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  bg="white"
                  focusBorderColor="yellow.500"
                />
              </div>
              <Button
                bg="yellow.500"
                color="white"
                type="submit"
                alignSelf="center"
                fontSize={{ base: 'md', lg: 'xl' }}
                mb="1rem"
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
