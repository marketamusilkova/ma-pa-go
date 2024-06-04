const API_URL = import.meta.env.VITE_API_URL ?? '/api';

import './HomePage.css';
import dayjs from 'dayjs';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { listPlans } from '../../library/api';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Banner } from './Banner/Banner';

export const HomePage = () => {
  const dnes = dayjs();
  const dnesNaformatovano = dnes.format('DD. MM. YYYY');
  const stedryDen = dayjs('2024-12-24');
  const zbyvaDoVanoc = stedryDen.diff(dnes, 'day');
  const galavecer = dayjs('2024-06-20');
  const zbyvaDoGalavecera = galavecer.diff(dnes, 'day');

  const [plans, setPlans] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [planTasks, setPlanTasks] = useState({});

  const fetchPlans = async () => {
    const data = await listPlans();
    setPlans(data);
  };

  const fetchTasks = async (plans) => {
    const allTasks = [];

    for (const plan of plans) {
      const response = await fetch(`${API_URL}/tasks/${plan.$$id}/`);
      const data = await response.json();
      allTasks.push(...data);
    }

    setTasks(allTasks);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (plans) {
      fetchTasks(plans);
    }
  }, [plans]);

  useEffect(() => {
    if (plans && tasks.length > 0) {
      const planTasksMap = plans.reduce((acc, plan) => {
        acc[plan.$$id] = tasks
          .filter((task) => task.plan === plan.$$id)
          .map((task) => task.title);
        return acc;
      }, {});

      setPlanTasks(planTasksMap);
    }
  }, [plans, tasks]);

  if (plans === null) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  console.log(plans);
  console.log(tasks);
  console.log(planTasks);

  return (
    <div className="homepage">
      <Banner />
      <div className="card_days">
        <Card>
          <CardHeader>
            <Heading size="lg">Dnes je {dnesNaformatovano}.</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Text pt="2" fontSize="lg">
                  Do Vánoc zbývá ještě {zbyvaDoVanoc} dní.
                </Text>
              </Box>
              <Box>
                <Text pt="2" fontSize="lg">
                  Do Galavečera DA web zbývá ještě {zbyvaDoGalavecera} dní.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
      {/* <div className="divider">
        <Divider />
      </div> */}
      <Heading className="plans_homepage" as="h2" size="lg">
        Aktuální plány
      </Heading>
      <Accordion allowToggle className="accordion">
        {plans.map((plan) => (
          <AccordionItem key={plan.$$id}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {plan.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <ul>
                {planTasks[plan.$$id]?.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ul>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Heading className="addPlan" as="h2" size="lg">
        <ChakraLink as={ReactRouterLink} to="/newplan">
          Přidat nový plán <PlusSquareIcon mx="2px" />
        </ChakraLink>
      </Heading>
    </div>
  );
};
