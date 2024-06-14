import { Plan } from '../Plan/Plan';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const PlansList = ({ plans, onDelete, tasksByPlans }) => {
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const calculateMaxHeight = () => {
      const heights = plans.map((plan) => tasksByPlans[plan.$$id]?.length || 0);
      setMaxHeight(Math.max(...heights));
    };

    calculateMaxHeight();
  }, [plans, tasksByPlans]);

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
              style={{ flex: 1, minHeight: `${maxHeight * 40}px` }} // Předpokládáme, že každý úkol zabírá cca 40px výšky
            />
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};
