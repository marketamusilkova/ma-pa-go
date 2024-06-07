import { useState } from 'react';
import { Weather } from './Weather/Weather';
import { Button, FormLabel, Input } from '@chakra-ui/react';

export const Psc = () => {
  const [pocasi, setPocasi] = useState(null);
  const [psc, setPsc] = useState('');

  console.log(psc);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Tak co?');
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${psc},cz&appid=1cf0721eeb8d383ccf388a7164c37012`,
    );
    const data = await response.json();
    const weatherData = data.list;
    setPocasi(weatherData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormLabel>Zadej PSČ (s mezerou, např. 550 01)</FormLabel>
        <Input
          type="text"
          value={psc}
          onChange={(event) => setPsc(event.target.value)}
        />
        <Button type="submit">Klikni</Button>
      </form>
      <Weather pocasi={pocasi} />
    </>
  );
};
