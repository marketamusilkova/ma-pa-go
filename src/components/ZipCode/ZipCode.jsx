import { useState } from 'react';
import { Weather } from './Weather/Weather';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import { sendZipcode } from '../../library/api';

export const ZipCode = () => {
  const [pocasi, setPocasi] = useState(null);
  const [zipCode, setZipCode] = useState('');

  console.log(zipCode);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendZipcode({ zipCode });
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},cz&appid=1cf0721eeb8d383ccf388a7164c37012`,
    // );
    // const data = await response.json();
    // const weatherData = data.list;
    // setPocasi(weatherData);
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
      <Weather pocasi={pocasi} />
    </>
  );
};
