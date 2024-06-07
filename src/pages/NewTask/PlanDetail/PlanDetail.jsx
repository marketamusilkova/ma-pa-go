import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Heading, Spinner, Text } from '@chakra-ui/react';
import { deleteTask, getPlan, listAllTasks } from '../../../library/api';
import './PlanDetail.css';
import tbbt from './TBBT.jpg';
import { Task } from './Task/Task';

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
    <div className="plan_detail">
      <img className="tbbt" src={tbbt} alt="The Big Bang Theory" />
      <div className="detail_content">
        <Heading as="h1" size="2xl">
          {plan.title}
        </Heading>
        <Text>{plan.description}</Text>
        <Divider />
        <Task tasks={tasks} onClick={handleClick} />
      </div>
    </div>
  );
};
