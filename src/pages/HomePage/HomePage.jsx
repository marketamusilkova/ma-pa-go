const API_URL = import.meta.env.VITE_API_URL ?? '/api';

import { useEffect, useState } from 'react';
import { listPlans } from '../../library/api';
import { Dayjs } from './Dayjs/Dayjs';
import { PlansAccordion } from './PlansAccordion/PlansAccordion';
import { Heading, Image, Stack, Card, Divider } from '@chakra-ui/react';
import batman_superman from './batman_superman.jpg';
import { Notifications } from './Notifications/Notifications';
import { Books } from './Books/Books';
import { Films } from './Films/Films';
import { Spinner } from '../../components/Spinner/Spinner';

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
      const response = await fetch(`${API_URL}/tasks/${plan.$$id}/`);
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
    <Card bg="rgba(253, 251, 251, 0.8)" p="2rem">
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
          mt="2rem"
        >
          <Dayjs />
          <Notifications />
        </Stack>
        {plans === null ? (
          <Spinner />
        ) : plans.length === 0 ? (
          <Heading>Nemáš ještě založené žádné plány...</Heading>
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
          justifyContent="space-evenly"
        >
          <Books />
          <Films />
        </Stack>
      </Stack>
    </Card>
  );
};
