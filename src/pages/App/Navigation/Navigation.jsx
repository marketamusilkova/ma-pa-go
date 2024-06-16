import { Link as RouterLink } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from '@chakra-ui/react';

export const Navigation = () => (
  <Flex
    bg="rgba(253, 251, 251, 0.8)"
    p={{ md: '2rem' }}
    pt={{ base: '1rem' }}
    pb={{ base: '1rem' }}
    justifyContent={{ base: 'center', md: 'end' }}
    borderRadius="8px"
  >
    <Breadcrumb fontWeight="medium" fontSize={{ base: 'md', lg: 'xl' }}>
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
  </Flex>
);
