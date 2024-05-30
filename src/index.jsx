import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import './global.css';
import { ToDo } from './components/ToDoPage';
import { AboutUs } from './components/AboutUsPage';
import { App } from './pages/App';
import { PlanDetail } from './components/PlanDetail';
import { PlanEdit } from './components/PlanEdit';
import { NewTask } from './components/NewTask';

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
        path: '/todo',
        element: <ToDo />,
      },
      {
        path: "/new",
        element: <NewTask/>,
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
        path: '/aboutus',
        element: <AboutUs />,
      },
    ],
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />,
);
