import { Heading, Spinner } from '@chakra-ui/react';
import { PlansList } from './PlansList/PlansList';
import { listPlans } from '../../library/api';
import { useEffect, useState } from 'react';
import frineds from './Friends.jpg';
import './Plans.css';

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
    <div className="plan">
      <img className="frineds" src={frineds} alt="Frineds" />
      <Heading className="heading_plans" as="h2" size="xl">
        Moje plány
      </Heading>
      <div className="cards_plans">
        {plans ? (
          <PlansList className="card_plans" plans={plans} onDelete={handleDelete} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
