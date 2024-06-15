import { Box, Spinner as Chakraspinner } from '@chakra-ui/react';

export const Spinner = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Chakraspinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color="yellow.500"
        size="lg"
      />
    </Box>
  );
};
