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
import { DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { appendBook, deleteBook, listBooks } from '../../../library/api';

export const Books = () => {
  const [books, setBooks] = useState(null);
  const [title, setTitle] = useState('');

  const fetchBooks = async () => {
    const data = await listBooks();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title) {
      await appendBook({ title });
    }
    fetchBooks();
    setTitle('');
  };

  const handleDelete = async (idBook) => {
    await deleteBook(idBook);
    fetchBooks();
  };

  return (
    <Card maxW="lg">
      <CardBody>
        <Image
          src="https://media.giphy.com/media/khbqKZOsHXiXwZSW8x/giphy.gif?cid=ecf05e47ba3tryiq9yy6y02i5iaepiv61h3lz3or0wslwdhv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="books"
          borderRadius="lg"
        />
        <Stack mt="6" mb="6" spacing="3">
          <Heading size={{ base: 'md', md: 'lg' }}>
            Co si asi tak přečtu?
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'xl' }}>
            Zde si můžeš přidat knihy, co máš v plánu si přečíst...
          </Text>
        </Stack>
        {books ? (
          <UnorderedList>
            <Stack>
              {books.map((book) => (
                <Stack
                  key={book.$$id}
                  direction="row"
                  justifyContent="space-between"
                >
                  <ListItem fontSize={{ base: 'md', lg: 'xl' }}>
                    {book.title}
                  </ListItem>
                  <Button
                    bg="yellow.500"
                    color="white"
                    onClick={() => handleDelete(book.$$id)}
                  >
                    <DeleteIcon />
                  </Button>
                </Stack>
              ))}
            </Stack>
          </UnorderedList>
        ) : null}
      </CardBody>
      <Divider color="yellow.500" />
      <CardFooter>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            focusBorderColor="yellow.500"
          />
          <Button
            type="submit"
            bg="yellow.500"
            color="white"
            mt="1rem"
            fontSize={{ base: 'md', lg: 'xl' }}
          >
            Přidat knihu
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
