import { Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import './Footer.css';
import czechitas from './czechitas.png';

export const Footer = () => {
  return (
    <div className="footer">
      <ChakraLink
        as={ReactRouterLink}
        to="/aboutus"
        fontWeight="large"
        fontSize={{ base: 'md', lg: 'xl' }}
      >
        O nás
      </ChakraLink>
      <div className="footer_text">
        <a className="a_footer" href="https://www.czechitas.cz/">
          <img src={czechitas} alt="czechitas" />
        </a>
        <Text fontSize={{ base: "12px", lg: '14px' }}>
          Vytvořeno v rámci Digitální akademie web na jaře 2024
        </Text>
      </div>
    </div>
  );
};
