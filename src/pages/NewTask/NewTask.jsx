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
  Spinner,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import harry_potter from './Harry_Potter.jpg';
import dumbledor from './dumbledor_720.jpg';

export const NewTask = () => {
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  
  const imageSrc = useBreakpointValue({ base: dumbledor, md: harry_potter})

  const navigate = useNavigate();

  const fetchPlans = async () => {
    const data = await listPlans();
    setPlans(data);
    setPlan(data[0].$$id);
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

  if (!plans) {
    return <Spinner />;
  }

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p="1rem">
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Stack width={{ md: '55%' }} align="center" justify="center">
          <Heading>Přidej nový úkol</Heading>
          <form
            onSubmit={handleSubmit}
            style={{ width: '100%', padding: '30px' }}
          >
            <FormLabel>Vyber k jakému plánu chceš přidat úkol</FormLabel>
            <Select
              aria-label="Výběr Plánu"
              value={plan}
              onChange={(event) => setPlan(event.target.value)}
              required
            >
              {plans.map((plan) => (
                <option key={plan.$$id} value={plan.$$id}>
                  {plan.title}
                </option>
              ))}
            </Select>
            <FormLabel>Název úkolu</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <FormLabel>
              Datum <small>(nepovinné)</small>
            </FormLabel>
            <Input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <Button m="4" type="submit">
              Přidat
            </Button>
          </form>
        </Stack>
        <Image
          maxW={{ md: '40%' }}
          src={imageSrc}
          alt="Harry Potter"
          borderRadius="lg"
        />
      </Stack>
    </Card>
  );
};
// <Image src={} alt="dumbledor" borderRadius="lg"/>
