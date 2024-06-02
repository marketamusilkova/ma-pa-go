import { Link, Outlet } from 'react-router-dom';
import './style.css';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const Navigation = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink>
        <Link to="/">Domů</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink>
        <Link to="/todo">TO DO</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink>
        <Link to="/new">Nový úkol</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);

export const App = () => {
  return (
    <div className='background'>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/aboutus">O nás</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </footer>
    </div>
  );
};
