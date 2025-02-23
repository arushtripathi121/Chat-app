import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';
import { Provider } from 'react-redux';
import appStore from '../redux/appStore';

const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/signup',
      element: <SignUpPage />
    }
    ,
    {
      path: '/home',
      element: <HomePage />
    }
  ])
  return (
    <div>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  )
}

export default Body;
