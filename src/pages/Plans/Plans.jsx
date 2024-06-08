import { Heading, Img, Spinner } from '@chakra-ui/react';
import { PlansList } from './PlansList/PlansList';
import { listPlans } from '../../library/api';
import { useEffect, useState } from 'react';
import friends from './Friends.jpg';
import './Plans.css';

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
    <div className="plan">
      <Heading className="heading_plans" as="h2" size="xl">
        Moje plány
      </Heading>
      <div className="cards_plans">
        {plans && tasksByPlans ? (
          <PlansList
            className="card_plans"
            plans={plans}
            onDelete={handleDelete}
            tasksByPlans={tasksByPlans}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <Img className="friends" src={friends} alt="Friends" />
    </div>
  );
};
