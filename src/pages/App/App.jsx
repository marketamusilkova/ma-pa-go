import { Outlet } from 'react-router-dom';
import './App.css';
import { Footer } from './Footer/Footer';
import { Navigation } from './Navigation/Navigation';
import { AI } from '../../components/AI/AI';
import { Stack } from '@chakra-ui/react';

export const App = () => {
  return (
    <Stack className="background" minH="100vh">
      <header>
        <Navigation />
      </header>
      <main>
        <AI />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </Stack>
  );
};
