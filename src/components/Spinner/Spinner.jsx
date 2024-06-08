import { Spinner as Chakraspinner } from "@chakra-ui/react";

export const Spinner = () => {
  return (
    <Chakraspinner
      thickness="3px"
      speed="0.65s"
      emptyColor="gray.200"
      color="yellow.500"
      size="lg"
    />
  );
};
