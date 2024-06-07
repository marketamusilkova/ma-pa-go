import { Plan } from '../Plan/Plan';
import { Card, CardBody } from '@chakra-ui/react';
import './PlansList.css';

export const PlansList = ({ plans, onDelete, tasksByPlans }) => {
  return (
    <>
      {plans.map((plan) => (
        <Card key={plan.$$id}>
          <CardBody>
            <Plan
              key={plan.$$id}
              plan={plan}
              onDelete={onDelete}
              tasks={
                tasksByPlans[plan.$$id]
              }
            />
          </CardBody>
        </Card>
      ))}
    </>
  );
};
