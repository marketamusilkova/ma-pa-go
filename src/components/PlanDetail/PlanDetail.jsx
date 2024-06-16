import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { deleteTask, getPlan, listAllTasks } from '../../library/api';
import { Task } from './Task/Task';
import { Spinner } from '../Spinner/Spinner';
import tbbt from './TBBT.jpg';

export const PlanDetail = () => {
  const [plan, setPlan] = useState(null);
  const { planId } = useParams();
  const [tasks, setTasks] = useState(null);

  const fetchPlan = async () => {
    const plan = await getPlan(planId);
    setPlan(plan);
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchTasks = async () => {
    const tasks = await listAllTasks(planId);
    setTasks(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!tasks && !plan) {
    return <Spinner />;
  }

  const handleClick = async (Id) => {
    tasks ? await deleteTask(Id) : null;
    fetchTasks();
  };

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p={{ base: '1rem', md: '2rem' }}>
      <Stack direction={{ base: 'column', md: 'row' }} alignItems="center">
        <Stack minW={{ md: '50%' }} m={{ md: '2rem' }}>
          <Heading size={{ base: 'lg', md: 'xl' }} alignSelf="center">
            {plan.title}
          </Heading>
          <Text fontSize={{ base: 'md', md: 'xl' }}>{plan.description}</Text>
          <Divider borderColor="yellow.500" />
          <Task tasks={tasks} onClick={handleClick} />
        </Stack>
        <Box>
          <Image
            src={tbbt}
            alt="The Big Bang Theory"
            objectFit="contain"
            borderRadius="lg"
            mt="1rem"
          />
        </Box>
      </Stack>
    </Card>
  );
};
