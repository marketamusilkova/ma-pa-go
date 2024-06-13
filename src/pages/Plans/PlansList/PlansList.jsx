import { Plan } from '../Plan/Plan';
import { Grid, GridItem, Stack } from '@chakra-ui/react';

export const PlansList = ({ plans, onDelete, tasksByPlans }) => {
  return (
    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
      {plans.map((plan) => (
        <GridItem w='100%'>
        <Plan
          key={plan.$$id}
          plan={plan}
          onDelete={onDelete}
          tasks={tasksByPlans[plan.$$id]}
        />
        </GridItem>
      ))}
    </Grid>
  );
};
