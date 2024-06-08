import { Plan } from '../Plan/Plan';
import { Stack } from '@chakra-ui/react';

export const PlansList = ({ plans, onDelete, tasksByPlans }) => {
  return (
    <Stack spacing={4} direction={{base: "column", lg: "row"}}>
      {plans.map((plan) => (
        <Plan
          key={plan.$$id}
          plan={plan}
          onDelete={onDelete}
          tasks={tasksByPlans[plan.$$id]}
        />
      ))}
    </Stack>
  );
};
