import {
  Card,
  Heading,
  Image,
  ScaleFade,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { PlansList } from './PlansList/PlansList';
import { listPlans } from '../../library/api';
import { useEffect, useState } from 'react';
import friends from './Friends.jpg';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

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
    if (tasks) {
      const groupedById = Object.groupBy(tasks, (task) => task.plan);
      setTasksByPlans(groupedById);
    }
  }, [tasks]);

  const handleDelete = () => {
    fetchPlans();
  };

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p="0.5rem">
      <Heading as="h2" size="xl" alignSelf="center" m="1rem">
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

      <Image src={friends} alt="Friends" borderRadius="lg" mt="2rem" />
    </Card>
  );
};
