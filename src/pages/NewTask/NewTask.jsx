import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appendTask, listPlans } from '../../library/api';
import {
  Button,
  Card,
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
    <Card bg="rgba(253, 251, 251, 0.8)" p="1rem">
      {!plans.length ? (
        <Heading>
          Nejprve si musíš založit nový plán a až poté můžeš přidat úkol.
        </Heading>
      ) : (
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
              <Button type="submit" bg="yellow.500" color="white" m="4">
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
      )}
    </Card>
  );
};
