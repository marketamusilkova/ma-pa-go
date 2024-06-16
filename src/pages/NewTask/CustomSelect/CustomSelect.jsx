import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useState } from 'react';

export const CustomSelect = ({ options, value, onChange }) => {
  const [selected, setSelected] = useState(
    options.find((o) => o.value === value) || null,
  );

  const handleSelect = (option) => {
    setSelected(option);
    onChange(option.value);
  };

  return (
    <Box width="100%">
      <Menu>
        <MenuButton
          w="100%"
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="white"
          borderWidth="1px"
        >
          {selected ? selected.label : 'Vyberte možnost'}
        </MenuButton>
        <MenuList>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSelect(option)}
              _hover={{ bg: '#D69E2E', color: 'white' }}
              _focus={{ bg: '#D69E2E', color: 'white' }}
              maxW="83vw"
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
