import { useState } from 'react';
import { appendPlan } from '../../library/api';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Stack,
  Textarea,
  useBreakpoint,
} from '@chakra-ui/react';
import star_wars0 from './star_wars_0.jpg';
import star_wars1 from './star_wars_1.jpg';
import star_wars3 from './star_wars_3.jpg';
import star_wars2 from './star_wars_2.jpg';

export const NewPlan = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const breakpoint = useBreakpoint();
  const isSmall = breakpoint === 'base' || breakpoint === 'sm';
  console.log(isSmall);
  const isLarge = ['md', 'lg', 'xl', '2xl'].includes(breakpoint);

  console.log(isLarge);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const plan = {
      title,
      description: description ? description : null,
    };

    await appendPlan(plan);
    navigate(`/newtask`);
  };

  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p="1rem">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        wrap="nowrap"
        align="center"
      >
        {isSmall ? (
          <Stack direction="row" justify="center" mb={4}>
            <Image minWidth="50%" src={star_wars0} alt="Star wars" borderRadius="lg"/>
            <Image minWidth="50%" src={star_wars1} alt="Star wars" borderRadius="lg"/>
          </Stack>
        ) : null}
        {isLarge ? (
          <Grid
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(2, 1fr)"
            gap={4}
            width="50%"
            height="auto"
          >
            <Image src={star_wars0} alt="Star wars" objectFit="cover" borderRadius="lg"/>
            <Image src={star_wars1} alt="Star wars" objectFit="cover" borderRadius="lg"/>
            <Image src={star_wars2} alt="Star wars" objectFit="cover" borderRadius="lg"/>
            <Image src={star_wars3} alt="Star wars" objectFit="cover" borderRadius="lg"/>
          </Grid>
        ) : null}

        <Stack
          textAlign={{ md: 'center' }}
          width={{ md: '50%' }}
          p={{ md: 4 }}
          m="30"
        >
          <Heading as="h2" size="xl" mb={4}>
            Vytvořit nový plán
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormLabel>Zadej název</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              mb={3}
            />
            <FormLabel>
              Popiš a upřesni si tento plán <small>(nepovinný údaj)</small>
            </FormLabel>
            <Textarea
              rows="3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              mb={3}
            />
            <Button bg="yellow.500" color="white" type="submit">Vytvořit</Button>
          </form>
        </Stack>
        {isSmall ? (
          <Stack direction="row" justify="center">
            <Image minWidth="50%" src={star_wars2} alt="Star wars" borderRadius="lg"/>
            <Image minWidth="50%" src={star_wars3} alt="Star wars" borderRadius="lg"/>
          </Stack>
        ) : null}
      </Flex>
    </Card>
  );
};
