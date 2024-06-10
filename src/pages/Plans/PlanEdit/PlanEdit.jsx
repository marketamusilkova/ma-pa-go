import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { getPlan, updatePlan } from '../../../library/api';
import mario from './Mario.jpg';

export const PlanEdit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [plan, setPlan] = useState(null);
  const { planId } = useParams();
  const navigate = useNavigate();

  const loadPlan = async () => {
    const plan = await getPlan(planId);
    setPlan(plan);
    setTitle(plan.title);
    setDescription(plan.description);
  };

  useEffect(() => {
    loadPlan();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updatePlan(planId, { title, description });
    navigate('/plans');
  };

  if (!plan) {
    return <Spinner />;
  }

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p="1rem">
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Box minW={{ md: '50%' }} p={{ md: '10px' }}>
          <form onSubmit={handleSubmit}>
            <Stack>
              <Heading as="h2" size="xl">
                Úprava plánu
              </Heading>

              <div>
                <FormLabel>Chceš změnit název?</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div>
                <FormLabel>Nebo chceš změnit popis?</FormLabel>
                <Textarea
                  rows="3"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></Textarea>
              </div>
              <Button bg="yellow.500" color="white" type="submit">
                Upravit
              </Button>
            </Stack>
          </form>
        </Box>
        <Image maxW={{ md: '50%' }} src={mario} alt="Super Mario" borderRadius="lg"/>
      </Stack>
    </Card>
  );
};
