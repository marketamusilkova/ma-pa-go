import { useState, useEffect } from 'react';
import { appendTask, listPlans } from '../../library/api';
import {
  Box,
  Button,
  Card,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { CustomSelect } from './CustomSelect/CustomSelect';
import { Spinner } from '../../components/Spinner/Spinner';
import harry_potter from './Harry_Potter.jpg';
import dumbledor from './Dumbledor.jpg';

export const NewTask = () => {
  const [plans, setPlans] = useState(null);
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
    setPlans(data.map((plan) => ({ value: plan.$$id, label: plan.title })));
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
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justifyContent="center"
        spacing="2rem"
      >
        {plans === null ? (
          <Spinner />
        ) : !plans.length ? (
          <Stack>
            <Heading textAlign="center" p={{ base: '1rem', md: '2rem' }}>
              Nejprve si musíš založit nový plán a až poté můžeš přidat úkol.
            </Heading>
            <Text
              textAlign="center"
              fontSize={{ base: 'xl', lg: '3xl' }}
              fontWeight="bold"
            >
              <ChakraLink as={ReactRouterLink} to="/newplan">
                Založit nový plán <PlusSquareIcon mx="2px" />
              </ChakraLink>
            </Text>
          </Stack>
        ) : (
          <Stack
            width={{ md: '55%' }}
            textAlign="center"
            justifyContent="center"
          >
            <Heading size={{ base: 'lg', md: 'xl' }} mb={4}>
              Přidej nový úkol
            </Heading>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <FormLabel fontSize={{ base: 'md', lg: 'xl' }}>
                Vyber k jakému plánu chceš přidat úkol
              </FormLabel>
              <CustomSelect
                options={plans}
                value={plan}
                onChange={(value) => setPlan(value)}
              />
              <FormLabel fontSize={{ base: 'md', lg: 'xl' }} mt={4}>
                Název úkolu
              </FormLabel>
              <Textarea
                rows="3"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                bg="white"
                required
                focusBorderColor="yellow.500"
                mb={3}
              />
              <FormLabel fontSize={{ base: 'md', lg: 'xl' }}>
                Deadline <small>(nepovinné)</small>
              </FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                bg="white"
                focusBorderColor="yellow.500"
                mb={3}
              />
              <Button
                type="submit"
                bg="yellow.500"
                color="white"
                fontSize={{ base: 'md', lg: 'xl' }}
              >
                Přidat
              </Button>
            </form>
          </Stack>
        )}
        <Box
          maxW={{ md: '40%' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={imageSrc} alt="Harry Potter" borderRadius="lg" />
        </Box>
      </Stack>
    </Card>
  );
};
