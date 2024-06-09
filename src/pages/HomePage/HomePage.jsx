const API_URL = import.meta.env.VITE_API_URL ?? '/api';

import './HomePage.css';

import { useEffect, useState } from 'react';
import { listPlans } from '../../library/api';
import { Dayjs } from './Dayjs/Dayjs';
import { PlansAccordion } from './PlansAccordion/PlansAccordion';
import { Heading, Img, Spinner } from '@chakra-ui/react';
import batman_superman from './batman_superman.jpg';
import { Notifications } from './Notifications/Notifications';

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
        acc[plan.$$id] = tasks
          .filter((task) => task.plan === plan.$$id)
          .map((task) => task.title);
        return acc;
      }, {});

      setPlanTasks(planTasksMap);
    }
  }, [plans, tasks]);

  console.log(plans);
  if (plans === null || plans.length === 0) {
    return (
      <div className="homepage">
        <Heading colorScheme="yellow">
          My secret plan how to rule the world
        </Heading>
        <Img src={batman_superman} alt="Batman and Superman" />
        <Dayjs />
        <Heading>Nemáš ještě založené žádné plány...</Heading>
        <Notifications />
      </div>
    );
  }

  return (
    <div className="homepage">
      <Heading colorScheme="yellow">
        My secret plan how to rule the world
      </Heading>
      <Img src={batman_superman} alt="Batman and Superman" />
      <Dayjs />
      <PlansAccordion plans={plans} planTasks={planTasks} />
      <Notifications />
    </div>
  );
};
