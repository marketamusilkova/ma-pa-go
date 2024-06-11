import { Hono } from '@hono';
import { cors, serveStatic } from '@hono/middleware';
import { load } from '@dotenv';
import { RESTfulCollections } from '@czechitas/restful-collections';
import { runCron } from './cron.js';

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
  .collection('books', {})
  .collection('films', {})
  .collection('notifications', {})
  .collection('checkbox', {})
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

runCron();

export const deletePlan = async (userId) => {
  const response = await fetch(
    `http://localhost:8000/api/notifications/${userId}`,
    {
      method: 'DELETE',
    },
  );
};

// deletePlan('');

export default app;
