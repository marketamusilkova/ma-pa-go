import { useState } from 'react';
import { Weather } from './Weather/Weather';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import { appendUser } from '../../library/api';

export const ZipCode = () => {
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await appendUser({ zipcode: zipCode, email: email });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormLabel>Zadej PSČ (s mezerou, např. 550 01)</FormLabel>
        <Input
          type="text"
          value={zipCode}
          onChange={(event) => setZipCode(event.target.value)}
        />
        <FormLabel>Zadej email
        </FormLabel>
        <Input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit">Klikni</Button>
      </form>
      {/* <Weather /> */}
    </>
  );
};
