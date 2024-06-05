import './Plan.css';
import { deletePlan } from '../../../library/api';
import {
  Button,
  Checkbox,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';

export const Plan = ({ plan, onDelete, tasksTitle }) => {
  const handleDeleteClick = async () => {
    await deletePlan(plan.$$id);
    if (onDelete) {
      onDelete();
    }
  };
  console.log(tasksTitle);
  const tasksListArray = tasksTitle.split(',').map((task) => task.trim());
  console.log(tasksListArray);

  return (
    <div className="card_plan">
      <Heading>{plan.title}</Heading>
      <Text>{plan.description}</Text>
      <div className="plan_action">
        <Button>
          <ChakraLink as={ReactRouterLink} to={`/plan/${plan.$$id}/edit`}>
            Upravit plán
          </ChakraLink>
        </Button>
        <Button type="button" onClick={handleDeleteClick}>
          Smazat plán
        </Button>
      </div>
      <Divider />
      <div className='tasks'>
        <Stack spacing={5} direction="column">
          {tasksListArray.map((task, index) => (
            <Checkbox key={index} colorScheme="red">
              {task}
            </Checkbox>
          ))}
        </Stack>
        <Button>
          <ChakraLink as={ReactRouterLink} to={`/newtask`}>
            Přidat úkol <PlusSquareIcon mx="2px" />
          </ChakraLink>
        </Button>
      </div>
    </div>
  );
};
