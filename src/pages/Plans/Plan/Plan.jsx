import { deletePlan } from '../../../library/api';
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';

export const Plan = ({ plan, onDelete, tasks }) => {
  const handleDeleteClick = async () => {
    await deletePlan(plan.$$id);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Card key={plan.$$id} w={{ lg: '33%' }}>
      <CardBody>
        <Stack h="100%">
          <Heading as="h1" size={{base: 'sm', lg: 'md'}}> 
            {plan.title}
          </Heading>
          <Text>{plan.description}</Text>
          <Stack className="plan_action" direction="row" justifyContent={'end'}>
            <Button size={{base: "sm", lg: "md"}}>
              <ChakraLink as={ReactRouterLink} to={`/plan/${plan.$$id}/edit`}>
              <EditIcon />
              </ChakraLink>
            </Button>
            <Button  type="button" onClick={handleDeleteClick} size={{base: "sm", lg: "md"}}>
              <DeleteIcon />
            </Button>
          </Stack>

          <Divider />

          <Stack direction="column" justifyContent="space-between" h="100%">
            <Stack>
              {tasks.map((task) => (
                <Stack
                  key={task.$$id}
                  justifyContent="space-between"
                  spacing={2}
                  direction={'row'}
                >
                  <Checkbox colorScheme="red">{task.title}</Checkbox>
                  <Button size={{base: "sm", lg: "md"}}>
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/task/${task.$$id}/edit`}
                    >
                      <EditIcon />
                    </ChakraLink>
                  </Button>
                </Stack>
              ))}
            </Stack>
            <Button>
              <ChakraLink as={ReactRouterLink} to={`/newtask`}>
                Přidat úkol <PlusSquareIcon mx="2px" />
              </ChakraLink>
            </Button>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
