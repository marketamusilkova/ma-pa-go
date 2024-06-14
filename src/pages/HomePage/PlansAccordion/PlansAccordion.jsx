import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';

export const PlansAccordion = ({ plans, planTasks }) => {
  const navigate = useNavigate();
  return (
    <>
      <Heading as="h2" size="lg" pr="8%" pl="8%" mt="2rem">
        Aktuální plány
      </Heading>
      <Accordion allowToggle pr="8%" pl="8%">
        {plans.map((plan) => (
          <AccordionItem key={plan.$$id}>
            <h2>
              <AccordionButton>
                <Box fontSize="xl" flex="1" textAlign="left">
                  {plan.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text textAlign="right" fontSize="lg">
                <ChakraLink onClick={() => navigate(`/plan/${plan.$$id}`)}>
                  Upravit nebo smazat úkol <EditIcon mx="2px" />
                  <DeleteIcon mx="2px" />
                </ChakraLink>
              </Text>
              <UnorderedList>
                {planTasks[plan.$$id]?.map((title, index) => (
                  <ListItem key={index} fontSize="lg">{title}</ListItem>
                ))}
              </UnorderedList>
              <Text textAlign="right" fontSize="lg">
                <ChakraLink as={ReactRouterLink} to="/newtask">
                  Přidat nový úkol <PlusSquareIcon mx="2px" />
                </ChakraLink>
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Heading as="h2" size={{ base: 'sm', md: 'md' }} pr="8%" pl="8%" mb="2rem">
        <ChakraLink as={ReactRouterLink} to="/newplan">
          Přidat nový plán <PlusSquareIcon mx="2px" />
        </ChakraLink>
      </Heading>
    </>
  );
};
