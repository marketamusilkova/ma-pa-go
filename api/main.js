import { Hono } from '@hono';
import { cors, serveStatic } from '@hono/middleware';
import { load } from '@dotenv';
import { RESTfulCollections } from '@czechitas/restful-collections';

const api = await new RESTfulCollections()
  .collection('plans', {
    keyBuilder: (value) =>
      value.description ? [value.title, value.description] : [value.title, '*'],
  })
  .collection('tasks', {
    keyBuilder: (value) =>
      value.date
        ? [value.plan, value.title, value.date]
        : [value.plan, value.title, '*'],
  })
  .buildServer();

const app = new Hono();

const env = await load();
if (env['CORS_ORIGIN']) {
  app.use(
    '/api/*',
    cors({
      origin: env['CORS_ORIGIN'].split(/, */),
    }),
  );
}
app.route('/api', api);
app.use('/*', serveStatic({ root: './' }));
app.get('*', serveStatic({ path: './index.html' }));
app.post('/api/zipcode', async (c) => {
  const { zipcode } = await c.req.json();
  console.log(zipcode);
  // Enqueue the message for delivery in 1 days
  const delay = 1000 * 60;
  await kv.enqueue(zipcode, { delay });

  return c.text('ok');
});

// Get a reference to a KV database
const kv = await Deno.openKv();

// Register a handler function to listen for values - this example shows
// how you might send a notification
kv.listenQueue(async (zipcode) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},cz&appid=1cf0721eeb8d383ccf388a7164c37012`,
  );
  const data = await response.json();
  const filterWeather = data.list
    .slice(0, 7) // Zobrazíme prvních 8 položek (24 hodin)
    .filter((item) => item.rain); // Filtrujeme pouze položky, které obsahují déšť
    console.log(filterWeather)
});

export default app;
