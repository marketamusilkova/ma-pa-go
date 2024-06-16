import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import './global.css';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { App } from './pages/App/App';
import { Plans } from './pages/Plans/Plans';
import { NewTask } from './pages/NewTask/NewTask';
import { NewPlan } from './pages/NewPlan/NewPlan';
import { TaskEdit } from './components/TaskEdit/TaskEdit';
import { PlanDetail } from './components/PlanDetail/PlanDetail';
import { PlanEdit } from './components/PlanEdit/PlanEdit';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/chakra-petch/400.css';
import theme from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/plans',
        element: <Plans />,
      },
      {
        path: '/newplan',
        element: <NewPlan />,
      },
      {
        path: '/newtask',
        element: <NewTask />,
      },
      {
        path: 'plan/:planId',
        element: <PlanDetail />,
      },
      {
        path: 'plan/:planId/edit',
        element: <PlanEdit />,
      },
      {
        path: 'task/:taskId/edit',
        element: <TaskEdit />,
      },
      {
        path: '/aboutus',
        element: <AboutUs />,
      },
    ],
  },
]);

createRoot(document.querySelector('#app')).render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />{' '}
  </ChakraProvider>,
);
