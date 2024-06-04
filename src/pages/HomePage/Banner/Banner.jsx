import { Heading } from '@chakra-ui/react';
import './Banner.css';

export const Banner = () => {
  return (
    <div className="header">
      <Heading className="header__text" as="h1" size="md">
        MY SECRET PLAN HOW TO RULE THE WORLD
      </Heading>
    </div>
  );
};
