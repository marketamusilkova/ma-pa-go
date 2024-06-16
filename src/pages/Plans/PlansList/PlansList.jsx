import { Plan } from '../Plan/Plan';
import { Grid, GridItem, Box } from '@chakra-ui/react';

export const PlansList = ({ plans, onDelete, tasksByPlans }) => {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
      alignItems="stretch"
    >
      {plans.map((plan) => (
        <GridItem key={plan.$$id} display="flex" flexDirection="column">
          <Box w="100%" flex="1" display="flex" flexDirection="column">
            <Plan
              plan={plan}
              onDelete={onDelete}
              tasks={tasksByPlans[plan.$$id]}
              style={{ flex: 1 }}
            />
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};
