import { Link as RouterLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import './Navigation.css';

export const Navigation = () => (
  <div className='navigation'>
    <Breadcrumb fontWeight="medium" fontSize="xl">
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
  </div>
);
