import sgMail from 'npm:@sendgrid/mail';
import { load } from '@dotenv';

const env = await load();
if (env['SENDGRID_API_KEY']) {
  sgMail.setApiKey(env['SENDGRID_API_KEY']);
}

export const listUsers = async () => {
  const response = await fetch(`http://localhost:8000/api/notifications`);
  return await response.json();
};

export const runCron = () => {
  Deno.cron('notification', '28 7 * * *', async () => {
    const users = await listUsers();

    users.forEach(async (user) => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${user.zipcode},cz&appid=1cf0721eeb8d383ccf388a7164c37012`,
      );
      const data = await response.json();
      if (data.list && data.list.length > 0) {
        const filterWeather = data.list
          .slice(0, 7) // Zobrazíme prvních 8 položek (24 hodin)
          .filter((item) => item.rain); // Filtrujeme pouze položky, které obsahují déšť
        console.log(filterWeather);

        if (filterWeather.length > 0) {
          const msg = {
            to: user.email,
            from: 'mrs.musilkova@gmail.com', // Use the email address or domain you verified above
            subject: 'Umbrella alert',
            text: 'Dneska bude pršet, vezmi si deštník.',
            html: '<strong>Dneska bude pršet, vezmi si deštník.</strong>',
          };

          try {
            console.log('send email');
            await sgMail.send(msg);
          } catch (error) {
            console.error(error);

            if (error.response) {
              console.error(error.response.body);
            }
          }
        }
      }
    });
  });
};
