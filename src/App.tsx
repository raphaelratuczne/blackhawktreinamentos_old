import { useEffect, lazy, Suspense } from 'react';
import './App.scss';
import { initializeApp } from 'firebase/app';
// import * as ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Users = lazy(() => import('./pages/Users/Users'));

const publicUrl = import.meta.env.VITE_PUBLIC_URL;

function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDPCsrqkYdJdIse_e6ASypCC6LVuvBSOV4',
      authDomain: 'blackhawktreinamentos.firebaseapp.com',
      projectId: 'blackhawktreinamentos',
      storageBucket: 'blackhawktreinamentos.appspot.com',
      messagingSenderId: '1032100286936',
      appId: '1:1032100286936:web:c9a70fd3b1f645491ea2ad',
    };

    const app = initializeApp(firebaseConfig);

    console.log('app', app);

    console.log('publicUrl', publicUrl);
  }, []);

  const router = createHashRouter(
    [
      {
        path: '/about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/users',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: '/home',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
    ],
    {
      basename: publicUrl,
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
