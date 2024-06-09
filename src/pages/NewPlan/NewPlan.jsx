import { useEffect, useState } from 'react';
import { appendPlan } from '../../library/api';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Img,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import './NewPlan.css';
import star_wars0 from './star_wars_0.jpg';
import star_wars1 from './star_wars_1.jpg';
import star_wars3 from './star_wars_3.jpg';
import star_wars2 from './star_wars_2.jpg';

export const NewPlan = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px or larger is considered a large screen
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    <div className="background_newplan">
      {isLargeScreen ? (
        <Flex
          direction="row"
          wrap="nowrap"
          align="center"
          className="largeScreenLayout"
        >
          <Grid
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(2, 1fr)"
            gap={4}
            width="50%"
            height="auto"
            className="imageGrid"
          >
            <Img src={star_wars0} alt="Star wars" objectFit="cover" />
            <Img src={star_wars1} alt="Star wars" objectFit="cover" />
            <Img src={star_wars2} alt="Star wars" objectFit="cover" />
            <Img src={star_wars3} alt="Star wars" objectFit="cover" />
          </Grid>
          <Stack
            direction="column"
            justify="center"
            textAlign={'center'}
            width="50%"
            p={4}
            m="30"
            className="contentSection"
          >
            <Heading as="h2" size="xl" mb={4}>
              Vytvořit nový plán
            </Heading>
            <form onSubmit={handleSubmit} className="form_newplan" >
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
              <Button type="submit" colorScheme="blue">
                Vytvořit
              </Button>
            </form>
          </Stack>
        </Flex>
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="smallScreenLayout"
        >
          <Stack direction="row" justify="center" mb={4}>
            <Img minWidth="50%" src={star_wars0} alt="Star wars" />
            <Img minWidth="50%" src={star_wars1} alt="Star wars" />
          </Stack>
          <Heading as="h2" size="lg" mb={4}>
            Vytvořit nový plán
          </Heading>
          <form
            onSubmit={handleSubmit}
            className="form_newplan"
            style={{ marginBottom: '20px' }}
          >
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
            <Button type="submit" colorScheme="blue">
              Vytvořit
            </Button>
          </form>
          <Stack direction="row" justify="center">
            <Img minWidth="50%" src={star_wars2} alt="Star wars" />
            <Img minWidth="50%" src={star_wars3} alt="Star wars" />
          </Stack>
        </Flex>
      )}
    </div>
  );
};
