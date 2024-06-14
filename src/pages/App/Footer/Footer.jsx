import { Box, Card, Flex, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import czechitas from './czechitas.png';

export const Footer = () => {
  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p="0.5rem">
      <ChakraLink
        as={ReactRouterLink}
        to="/aboutus"
        fontWeight="large"
        fontSize={{ base: 'md', lg: 'xl' }}
        textAlign="center"
        mt="2rem"
      >
        O nás
      </ChakraLink>

      <Flex direction="row" justifyContent="center">
        <Box maxW={{ base: '100px', md: '200px' }}>
          <a href="https://www.czechitas.cz/">
            <img src={czechitas} alt="czechitas" />
          </a>
        </Box>
        <Text fontSize={{ base: '12px', md: '18px' }} alignSelf="center">
          Vytvořeno v rámci Digitální akademie web na jaře 2024
        </Text>
      </Flex>
    </Card>
  );
};
