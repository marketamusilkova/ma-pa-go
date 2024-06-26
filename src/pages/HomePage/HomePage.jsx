const API_URL = import.meta.env.VITE_API_URL ?? '/api';

import { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Dayjs } from './Dayjs/Dayjs';
import { PlansAccordion } from './PlansAccordion/PlansAccordion';
import { Notifications } from './Notifications/Notifications';
import { listPlans } from '../../library/api';
import { Books } from './Books/Books';
import { Films } from './Films/Films';
import { Spinner } from '../../components/Spinner/Spinner';
import { Heading, Image, Stack, Card, Text } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import batman_superman from './batman_superman.jpg';

export const HomePage = () => {
  const [plans, setPlans] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [planTasks, setPlanTasks] = useState({});

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
    if (plans && tasks.length > 0) {
      const planTasksMap = plans.reduce((acc, plan) => {
        acc[plan.$$id] = tasks.filter((task) => task.plan === plan.$$id);
        return acc;
      }, {});

      setPlanTasks(planTasksMap);
    }
  }, [plans, tasks]);

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p={{ base: '1rem', md: '2rem' }}>
      <Stack spacing={5}>
        <Heading size={{ base: 'lg', md: '2xl' }}>
          MY SECRET PLAN HOW TO RULE THE WORLD
        </Heading>
        <Image
          src={batman_superman}
          alt="Batman and Superman"
          borderRadius="lg"
        />
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-evenly"
          mt={{ lg: '2rem' }}
        >
          <Dayjs />
          <Notifications />
        </Stack>
        {plans === null ? (
          <Spinner />
        ) : plans.length === 0 ? (
          <Stack>
            <Heading
              mt="2rem"
              mb="2rem"
              textAlign="center"
              size={{ base: 'md', md: 'xl' }}
            >
              Nemáš ještě vytvořen žádný plán.
            </Heading>
            <Text
              textAlign="center"
              fontSize={{ base: 'xl', lg: '3xl' }}
              fontWeight="bold"
              mb="2rem"
            >
              <ChakraLink as={ReactRouterLink} to="/newplan">
                Založit nový plán <PlusSquareIcon mx="2px" />
              </ChakraLink>
            </Text>
          </Stack>
        ) : (
          <PlansAccordion
            plans={plans}
            planTasks={Object.fromEntries(
              Object.entries(planTasks).map(([key, value]) => [
                key,
                value
                  .sort((a, b) => a.order - b.order)
                  .map((task) => task.title),
              ]),
            )}
          />
        )}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent={{ md: 'space-evenly' }}
          alignItems={{ base: 'center', md: 'stretch' }}
          h="100%"
        >
          <Books />
          <Films />
        </Stack>
      </Stack>
    </Card>
  );
};
