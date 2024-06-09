import { Card, Grid, GridItem, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import czechitas from './czechitas.png';

export const Footer = () => {
  return (
    <Card p="0.5rem"
      bg="rgba(253, 251, 251, 0.8)">
    <Grid
      gridTemplateRows="auto 1fr"
      gridTemplateColumns="1fr 2fr"
      gap={4}
      
          >
      <GridItem colSpan={2} textAlign="center">
        <ChakraLink
          as={ReactRouterLink}
          to="/aboutus"
          fontWeight="large"
          fontSize={{ base: 'md', lg: 'xl' }}
        >
          O nás
        </ChakraLink>
      </GridItem>
      <GridItem rowStart={2} maxW="100px" justifySelf="center">
        <a className="a_footer" href="https://www.czechitas.cz/">
          <img src={czechitas} alt="czechitas" />
        </a>
      </GridItem>
      <GridItem rowStart={2} textAlign="center">
        <Text fontSize={{ base: '12px', lg: '14px' }}>
          Vytvořeno v rámci Digitální akademie web na jaře 2024
        </Text>
      </GridItem>
    </Grid>
    </Card>
  );
};
