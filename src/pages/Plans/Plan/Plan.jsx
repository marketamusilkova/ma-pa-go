import "./Plan.css"
import { deletePlan } from '../../../library/api';
import { Button, Heading, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';


export const Plan = ({ plan, onDelete }) => {
  const handleDeleteClick = async () => {
    await deletePlan(plan.$$id);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <>
      <Heading>{plan.title}</Heading>
      <Text>{plan.description}</Text>
      <div className="plan_action">
        <ChakraLink as={ReactRouterLink} to={`/plan/${plan.$$id}`}>
          Zobrazit
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to={`/plan/${plan.$$id}/edit`}>
          Upravit
        </ChakraLink>
        <Button type="button" onClick={handleDeleteClick}>
          Smazat
        </Button>
      </div>
    </>
  );
};
