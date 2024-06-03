import { Link as RouterLink, Outlet } from 'react-router-dom';
import './App.css';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const Navigation = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink as={RouterLink} to="/">
        Domů
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink as={RouterLink} to="/plans">
        Plány
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink as={RouterLink} to="/newplan">
        Nový plán
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink as={RouterLink} to="/newtask">
        Nový úkol
      </BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);

export const App = () => {
  return (
    <div className="background">
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/aboutus">
              O nás
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </footer>
    </div>
  );
};
