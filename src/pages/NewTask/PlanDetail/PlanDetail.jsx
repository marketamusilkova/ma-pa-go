import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Divider,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { getPlan, listAllTasks } from '../../../library/api';
import './PlanDetail.css';
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

  if (!tasks) {
    return <Spinner />;
  }
  if (!plan) {
    return <Spinner />;
  }

  console.log(tasks);

  return (
    <div className="plan_detail">
      <img className="tbbt" src={tbbt} alt="The Big Bang Theory" />
      <div className="detail_content">
        <Heading as="h1" size="2xl">
          {plan.title}
        </Heading>
        <Text>{plan.description}</Text>
        <Divider />
        <Heading as="h2" size="lg">
          Úkoly
        </Heading>
        <UnorderedList>
          {tasks.map((task) => (
            <div key={task.$$id}>
              <ListItem>{task.title}</ListItem>
              <Text> {task.date ? `datum: ${task.date}` : null}</Text>
              <Divider />
            </div>
          ))}
        </UnorderedList>
      </div>
    </div>
  );
};
