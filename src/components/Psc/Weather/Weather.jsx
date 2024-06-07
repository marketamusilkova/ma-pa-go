import { useState } from 'react';

export const Weather = ({ pocasi }) => {
  // useEffect(() => {
  //   const fetchURL = async () => {
  //     const response = await fetch(
  //       'https://api.openweathermap.org/data/2.5/weather?zip={zip code},cz&appid=1cf0721eeb8d383ccf388a7164c37012',
  //     );

  //     const data = await response.json();
  //     const weatherData = data.list;
  //     setPocasi(weatherData);
  //     console.log(weatherData);
  //   };
  //   fetchURL();
  // }, []);

  if (pocasi === null) {
    return null;
  }

  const filteredPocasi = pocasi
    .slice(0, 7) // Zobrazíme prvních 8 položek (24 hodin)
    .filter((item) => item.rain); // Filtrujeme pouze položky, které obsahují déšť
  console.log(filteredPocasi);

  if (filteredPocasi.length === 0) {
    return <div>Dnes nebude pršet, s deštníkem se netahej.</div>;
  }

  return (
    <div className="weatherInfo">
      {filteredPocasi.map((item, index) => (
        <div key={index}>
          <p>{`Weather: ${item.weather[0].description}`}</p>
          {item.rain && <p>{`Rain volume: ${item.rain['3h']} mm`}</p>}
        </div>
      ))}
    </div>
  );
};
