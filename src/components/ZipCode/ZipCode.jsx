import { useState } from 'react';
import { Weather } from './Weather/Weather';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import { sendZipcode } from '../../library/api';

export const ZipCode = () => {
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendZipcode({ zipcode: zipCode });
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
        <Button type="submit">Klikni</Button>
      </form>
      {/* <Weather /> */}
    </>
  );
};
