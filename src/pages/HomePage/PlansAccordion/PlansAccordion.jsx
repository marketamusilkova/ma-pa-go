import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';

export const PlansAccordion = ({ plans, planTasks }) => {
  return (
    <>
      <Heading as="h2" size="xl">
        Aktuální plány
      </Heading>
      <Accordion allowToggle>
        {plans.map((plan) => (
          <AccordionItem key={plan.$$id}>
            <h2>
              <AccordionButton>
                <Box as="h2" flex="1" textAlign="left">
                  {plan.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <UnorderedList>
                {planTasks[plan.$$id]?.map((title, index) => (
                  <ListItem key={index}>{title}</ListItem>
                ))}
              </UnorderedList>
              <Text textAlign="right">
                <ChakraLink as={ReactRouterLink} to="/newtask">
                  Přidat nový úkol <PlusSquareIcon mx="2px" />
                </ChakraLink>
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Heading as="h2" size={{base: "md", md: "lg"}}>
        <ChakraLink as={ReactRouterLink} to="/newplan">
          Přidat nový plán <PlusSquareIcon mx="2px" />
        </ChakraLink>
      </Heading>
    </>
  );
};
