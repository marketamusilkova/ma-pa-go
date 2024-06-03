import { Spinner } from '@chakra-ui/react';
import { PlansList } from './PlansList/PlansList';
import { listPlans } from '../../library/api';
import { useEffect, useState } from 'react';

export const Plans = () => {
  const [plans, setPlans] = useState(null);

  const fetchPlans = async () => {
    const data = await listPlans();
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = () => {
    fetchPlans();
  };

  return (
    <>
      <h2>Seznam všech mých To Do listů</h2>
      {plans ? (
        <PlansList plans={plans} onDelete={handleDelete} />
      ) : (
        <Spinner />
      )}
    </>
  );
};
