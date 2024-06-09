import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Input,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { appendFilm, deleteFilm, listFilms } from '../../../library/api';

export const Films = () => {
  const [films, setFilms] = useState(null);
  const [title, setTitle] = useState('');

  const fetchFilms = async () => {
    const data = await listFilms();
    setFilms(data);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await appendFilm({ title });
    fetchFilms();
    setTitle('');
  };

  const handleDelete = async (idFilm) => {
    await deleteFilm(idFilm);
    fetchFilms();
  };

  if (!films) {
    return (
      <Card maxW="lg">
        <CardBody>
          <Image
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa29lZHQwZWZvemc1c2lpMXRiYXppbHNuOWdqc3RmYnFwYmxyNmxwNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nMQ5HIMmB6Lhwlj7JG/giphy.gif"
            alt="films"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Už jsi viděla Osvícení?</Heading>
            <Text>
              Zde si můžeš přidat filmy a seriály, co máš v plánu zkouknout...
            </Text>
          </Stack>
        </CardBody>
        <Divider color="yellow.500" />
        <CardFooter>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Button type="submit" colorScheme="yellow">
              Přidat film nebo seriál
            </Button>
          </form>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card maxW="lg">
      <CardBody>
        <Image
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa29lZHQwZWZvemc1c2lpMXRiYXppbHNuOWdqc3RmYnFwYmxyNmxwNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nMQ5HIMmB6Lhwlj7JG/giphy.gif"
          alt="films"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Už jsi viděla Osvícení?</Heading>
          <Text>
            Zde si můžeš přidat filmy a seriály, co máš v plánu zkouknout...
          </Text>
        </Stack>
        <UnorderedList>
          {films.map((film) => (
            <div key={film.$$id}>
              <ListItem>{film.title}</ListItem>
              <Button onClick={() => handleDelete(film.$$id)}>Smazat</Button>
            </div>
          ))}
        </UnorderedList>
      </CardBody>
      <Divider color="yellow.500" />
      <CardFooter>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Button type="submit" colorScheme="yellow">
            Přidat film nebo seriál
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
