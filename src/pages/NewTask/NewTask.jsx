import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appendTask, listPlans } from '../../library/api';
import {
  Box,
  Button,
  Card,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Textarea,
  useBreakpointValue,
} from '@chakra-ui/react';
import harry_potter from './Harry_Potter.jpg';
import dumbledor from './Dumbledor.jpg';

export const NewTask = () => {
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const imageSrc = useBreakpointValue(
    { base: dumbledor, md: harry_potter },
    { ssr: false },
  );

  const navigate = useNavigate();

  const fetchPlans = async () => {
    const data = await listPlans();
    setPlans(data);
    if (data.length > 0) {
      setPlan(data[0].$$id);
    } else {
      setPlan('');
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const task = {
      plan,
      title,
      date: date ? date : null,
    };

    await appendTask(task);
    navigate(`/plan/${plan}`);
  };

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p={{ base: '1rem', md: '2rem' }}>
      {!plans.length ? (
        <Heading textAlign="center" p={{ base: '1rem', md: '2rem' }}>
          Nejprve si musíš založit nový plán a až poté můžeš přidat úkol.
        </Heading>
      ) : (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justifyContent="center"
          spacing="2rem"
        >
          <Stack
            width={{ md: '55%' }}
            textAlign="center"
            justifyContent="center"
          >
            <Heading size={{ base: 'lg', md: 'xl' }}>Přidej nový úkol</Heading>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <FormLabel fontSize={{ base: 'md', lg: 'xl' }}>
                Vyber k jakému plánu chceš přidat úkol
              </FormLabel>
              <Select
                aria-label="Výběr Plánu"
                value={plan}
                onChange={(event) => setPlan(event.target.value)}
                bg="white"
                required
                focusBorderColor="yellow.500"
              >
                {plans.map((plan) => (
                  <option key={plan.$$id} value={plan.$$id}>
                    {plan.title}
                  </option>
                ))}
              </Select>
              <FormLabel fontSize={{ base: 'md', lg: 'xl' }}>
                Název úkolu
              </FormLabel>
              <Textarea
                rows="3"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                bg="white"
                required
                focusBorderColor="yellow.500"
              />
              <FormLabel fontSize={{ base: 'md', lg: 'xl' }}>
                Datum <small>(nepovinné)</small>
              </FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                bg="white"
                focusBorderColor="yellow.500"
              />
              <Button
                type="submit"
                bg="yellow.500"
                color="white"
                mt="2"
                fontSize={{ base: 'md', lg: 'xl' }}
              >
                Přidat
              </Button>
            </form>
          </Stack>
          <Box
            maxW={{ md: '40%' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={imageSrc} alt="Harry Potter" borderRadius="lg" />
          </Box>
        </Stack>
      )}
    </Card>
  );
};
