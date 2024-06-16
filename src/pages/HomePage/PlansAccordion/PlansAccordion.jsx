import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
} from '@chakra-ui/react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';

export const PlansAccordion = ({ plans, planTasks }) => {
  const navigate = useNavigate();
  return (
    <Box display="flex" minW="90%" alignSelf="center">
      <Stack minW="100%">
        <Heading size={{ base: 'md', md: 'lg' }} mt={{ lg: '2rem' }}>
          Aktuální plány
        </Heading>
        <Accordion allowToggle>
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
                <Text
                  textAlign="right"
                  fontSize={{ base: 'md', lg: 'lg' }}
                  fontWeight="bold"
                >
                  <ChakraLink onClick={() => navigate(`/plan/${plan.$$id}`)}>
                    Upravit nebo smazat úkol <EditIcon mx="2px" />
                    <DeleteIcon mx="2px" />
                  </ChakraLink>
                </Text>
                <UnorderedList pt="1rem" pb="1rem">
                  {planTasks[plan.$$id]?.map((title, index) => (
                    <ListItem key={index} fontSize={{ base: 'md', lg: 'lg' }}>
                      {title}
                    </ListItem>
                  ))}
                </UnorderedList>
                <Text
                  textAlign="right"
                  fontSize={{ base: 'md', lg: 'lg' }}
                  fontWeight="bold"
                >
                  <ChakraLink as={ReactRouterLink} to="/newtask">
                    Přidat nový úkol <PlusSquareIcon mx="2px" />
                  </ChakraLink>
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <Text fontSize="xl" mb={{ lg: '2rem' }} mt="1rem" fontWeight="bold">
          <ChakraLink as={ReactRouterLink} to="/newplan">
            Přidat nový plán <PlusSquareIcon mx="2px" />
          </ChakraLink>
        </Text>
      </Stack>
    </Box>
  );
};
