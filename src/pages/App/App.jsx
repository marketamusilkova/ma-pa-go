import { Outlet } from 'react-router-dom';
import './App.css';
import { Footer } from './Footer/Footer';
import { Navigation } from './Navigation/Navigation';
import { AI } from '../../components/AI/AI';
import { Container, Flex } from '@chakra-ui/react';

export const App = () => {
  return (
    <Flex direction="column" className="background" 
     minH="100vh">
      <header>
        <Container maxW={"8xl"}>
          <Navigation />
        </Container>
      </header>
      <Flex flexGrow={1} mt="1rem" mb="1rem">
      <main>
         <Container maxW={"8xl"}>
          <AI />
          <Outlet />
        </Container>
      </main></Flex>
      <footer>
        <Container maxW={"8xl"}>
          <Footer />
        </Container>
      </footer>
    </Flex>
  );
};
