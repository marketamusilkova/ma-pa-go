import { Plan } from '../Plan/Plan';
import { Grid, GridItem, Box, useBreakpointValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const PlansList = ({ plans, onDelete, tasksByPlans }) => {
  const isBase = useBreakpointValue({ base: true, md: false });
  const [heights, setHeights] = useState([]);

  useEffect(() => {
    if (!isBase) {
      const calculateHeights = () => {
        const tempHeights = [];
        for (let i = 0; i < plans.length; i += 2) {
          const height1 = tasksByPlans[plans[i].$$id]?.length || 0;
          const height2 = tasksByPlans[plans[i + 1]?.$$id]?.length || 0;
          const maxHeight = Math.max(height1, height2);
          tempHeights.push(maxHeight, maxHeight);
        }
        setHeights(tempHeights);
      };

      calculateHeights();
    }
  }, [plans, tasksByPlans, isBase]);

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
      alignItems="stretch"
    >
      {plans.map((plan, index) => (
        <GridItem key={plan.$$id} display="flex" flexDirection="column">
          <Box
            w="100%"
            flex="1"
            display="flex"
            flexDirection="column"
            minHeight={isBase ? 'auto' : `${heights[index] * 40}px`} // Adjust height multiplier as needed
          >
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
