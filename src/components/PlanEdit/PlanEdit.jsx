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
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { Spinner } from '../Spinner/Spinner';
import { getPlan, updatePlan } from '../../library/api';
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
    setTitle(plan.title || '');
    setDescription(plan.description || '');
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
    <Card bg="rgba(253, 251, 251, 0.8)" p={{ base: '1rem', md: '2rem' }}>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Box minW={{ md: '50%' }} p={{ md: '10px' }}>
          <form onSubmit={handleSubmit}>
            <Stack p={{ md: '20px' }}>
              <Heading
                as="h2"
                size={{ base: 'lg', md: 'xl' }}
                alignSelf={'center'}
                mb={4}
              >
                Úprava plánu
              </Heading>
              <div>
                <FormLabel fontSize={{ base: 'md', lg: 'xl' }}>
                  Chceš změnit název?
                </FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  mb={3}
                  bg="white"
                  focusBorderColor="yellow.500"
                />
              </div>
              <div>
                <FormLabel fontSize={{ base: 'md', lg: 'xl' }}>
                  Nebo chceš změnit popis?
                </FormLabel>
                <Textarea
                  rows="3"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  mb={3}
                  bg="white"
                  focusBorderColor="yellow.500"
                ></Textarea>
              </div>
              <Button
                type="submit"
                bg="yellow.500"
                color="white"
                fontSize={{ base: 'md', lg: 'xl' }}
                alignSelf="center"
                mb="1rem"
              >
                Upravit
              </Button>
            </Stack>
          </form>
        </Box>
        <Box maxW={{ md: '50%' }} alignSelf="center">
          <Image src={mario} alt="Super Mario" borderRadius="lg" />
        </Box>
      </Stack>
    </Card>
  );
};
