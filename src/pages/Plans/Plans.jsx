import { Card, Heading, Image } from '@chakra-ui/react';
import { PlansList } from './PlansList/PlansList';
import { listPlans } from '../../library/api';
import { useEffect, useState } from 'react';
import friends from './Friends.jpg';
import { Spinner } from '../../components/Spinner/Spinner';

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
      const groupedById = Object.groupBy(tasks, (task) => task.plan);
      setTasksByPlans(groupedById);
    }
  }, [tasks]);

  const handleDelete = () => {
    fetchPlans();
  };

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p={{ base: '1rem', md: '2rem' }}>
      <Heading size={{ base: 'lg', md: 'xl' }} alignSelf="center" mb="1rem">
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
