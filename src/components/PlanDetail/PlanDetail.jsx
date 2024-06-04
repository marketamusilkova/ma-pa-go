import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlan, listAllTasks } from '../../library/api';
import { Heading, Spinner, Text } from '@chakra-ui/react';

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

  if (!tasks) {
    return <Spinner />;
  }
  if (!plan) {
    return <Spinner />;
  }

  console.log(tasks)

  return (
    <>
      <Heading as='h1' size='2xl'>{plan.title}</Heading>
      <Text>{plan.description}</Text>
      <Heading as='h2' size='lg'>Úkoly</Heading>
      {tasks.map((task) => (
        <div key={task.$$id}>
          <Text>{task.title}</Text>
          <Text>{task.date ? task.date : null}</Text>
        </div>
      ))}
    </>
  );
};
