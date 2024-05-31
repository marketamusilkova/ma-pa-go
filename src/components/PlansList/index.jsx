import { Plan } from '../Plan';
import { Card, CardBody } from '@chakra-ui/react';
import './style.css';

export const PlansList = ({ plans, onDelete }) => {
  return (
    <>
      {plans.map((plan) => (
        <Card className="card">
          <CardBody>
            {' '}
            <Plan key={plan.$$id} plan={plan} onDelete={onDelete} />
          </CardBody>
        </Card>
      ))}
    </>
  );
};
