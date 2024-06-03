import { Header } from './Header/Header';
import './HomePage.css';
import dayjs from 'dayjs';
import { Box, Heading } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { listPlans } from '../../library/api';

export const HomePage = () => {
  const dnes = dayjs();
  const dnesNaformatovano = dnes.format('MM. DD. YYYY');
  const stedryDen = dayjs('2024-12-24');
  const zbyva = stedryDen.diff(dnes, 'day');

  const [plans, setPlans] = useState(null);

  const fetchPlans = async () => {
    const data = await listPlans();
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (plans === null) {
    return (
      <>
        <Header />
        <Heading>Dnes je {dnesNaformatovano}.</Heading>
        <Heading>Do Vánoc zbývá ještě {zbyva} dní!</Heading>
        <Heading>Nemáš zatím žádné plány?</Heading>
      </>
    );
  }

  return (
    <>
      <Header />
      <Heading>Dnes je {dnesNaformatovano}.</Heading>
      <Heading>Do Vánoc zbývá ještě {zbyva} dní!</Heading>
      <Heading>Aktuální plány:</Heading>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
