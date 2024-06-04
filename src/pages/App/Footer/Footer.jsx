import { Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import "./Footer.css"

export const Footer = () => {
  return (
    <div className='footer'>
      <ChakraLink as={ReactRouterLink} to="/aboutus" fontWeight='medium' fontSize='xl'>
        O nás
      </ChakraLink>
      <Text>
        Vyvořeno v rámci Digitální akademie web od Czechitas na jaře 2024
      </Text>
    </div>
  );
};
