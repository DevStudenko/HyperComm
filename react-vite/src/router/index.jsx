import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Auth/LoginFormPage';
import SignupFormPage from '../components/Auth/SignupFormPage';

import Layout from './Layout';
import MainComponent from '../components/Main/Main';

import AllChannels from '../components/Channels/Channels';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainComponent/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },

    ],
  },
]);
