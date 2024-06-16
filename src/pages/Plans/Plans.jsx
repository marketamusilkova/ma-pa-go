const API_URL = import.meta.env.VITE_API_URL ?? '/api';

import { Box, Card, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { PlansList } from './PlansList/PlansList';
import { listPlans } from '../../library/api';
import { useEffect, useState } from 'react';
import friends from './Friends.jpg';
import { Spinner } from '../../components/Spinner/Spinner';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';

export const Plans = () => {
  const [plans, setPlans] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [tasksByPlans, setTasksByPlans] = useState(null);

  const fetchPlans = async () => {
    const data = await listPlans();
    setPlans(data);
  };

  const fetchTasks = async (plans) => {
    const allTasks = [];
    for (const plan of plans) {
      const response = await fetch(`${API_URL}/tasks/by-plan/${plan.$$id}/`);
      const data = await response.json();
      allTasks.push(...data);
    }
    setTasks(allTasks);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (plans) {
      fetchTasks(plans);
    }
  }, [plans]);

  useEffect(() => {
    if (tasks) {
      const groupedById = tasks.reduce((acc, task) => {
        if (!acc[task.plan]) {
          acc[task.plan] = [];
        }
        acc[task.plan].push(task);
        return acc;
      }, {});
      setTasksByPlans(groupedById);
    }
  }, [tasks]);

  const handleDelete = () => {
    fetchPlans();
  };

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p={{ base: '1rem', md: '2rem' }}>
      {plans === null ? (
        <Spinner />
      ) : plans.length === 0 ? (
        <Stack>
          <Heading textAlign="center" p={{ base: '1rem', md: '2rem' }}>
            Nemáš ještě vytvořen žádný plán.
          </Heading>
          <Text
            textAlign="center"
            fontSize={{ base: 'xl', lg: '3xl' }}
            fontWeight="bold"
          >
            <ChakraLink as={ReactRouterLink} to="/newplan">
              Založit nový plán <PlusSquareIcon mx="2px" />
            </ChakraLink>
          </Text>
        </Stack>
      ) : (
        <Box>
          <Heading size={{ base: 'lg', md: 'xl' }} align="center" mb="1rem">
            Moje plány
          </Heading>
          {plans && tasksByPlans ? (
            <PlansList
              plans={plans}
              onDelete={handleDelete}
              tasksByPlans={tasksByPlans}
            />
          ) : (
            <Spinner />
          )}
        </Box>
      )}
      <Image src={friends} alt="Friends" borderRadius="lg" mt="2rem" />
    </Card>
  );
};
