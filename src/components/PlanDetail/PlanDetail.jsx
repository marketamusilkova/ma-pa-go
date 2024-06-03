import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlan, listAllTasks } from '../../library/api';
import { Spinner } from '@chakra-ui/react';

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
      <h1>{plan.title}</h1>
      <p>{plan.description}</p>
      <h2>Úkoly</h2>
      {tasks.map((task) => (
        <div key={task.$$id}>
          <div>{task.title}</div>
          <div>{task.date ? task.date : null}</div>
        </div>
      ))}
    </>
  );
};
