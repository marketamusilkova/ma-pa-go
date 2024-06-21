import { Hono } from '@hono';
import { cors } from '@hono/cors';
import { serveStatic } from '@hono/deno';
import { load } from '@dotenv';
import { createCollections } from '@czechitas/restful-collections';
import { runCron } from './cron.js';

const collections = await createCollections({
  plans: {},
  tasks: {
    secondaryIndexes: {
      'by-plan': (value) =>
        value.date ? [value.plan, value.date] : [value.plan, '*'],
    },
  },
  books: {},
  films: {},
  checkboxes: {},
  notifications: {
    internal: true,
  },
});

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

const api = collections.buildServer();
api.post('/notifications', async (c) =>
  c.json(
    await collections.collections.notifications.append(await c.req.json()),
  ),
);
api.delete('/notifications/:id', async (c) => {
  await collections.collections.notifications.delete(await c.req.param('id'));
  return c.body(null, 204);
});

app.route('/api', api);
app.use('/*', serveStatic({ root: './' }));
app.get('*', serveStatic({ path: './index.html' }));

// funkce pro ruční smazání uživatele, který se přihlásil k notifikacím
const deleteUser = async () =>
  await collections.collections.notifications.delete(
    '01J0H4ATB9YCJAWZQGNAC3DART',
  );

await deleteUser('01J0H4ATB9YCJAWZQGNAC3DART');

//kód, který získá všechny objekty z kolekce "notifications"
export const listUsers = async () =>
  await collections.collections.notifications.list();

runCron();

export default app;
