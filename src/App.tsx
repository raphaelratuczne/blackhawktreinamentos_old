import { useEffect, lazy, Suspense } from 'react';
import './App.scss';
import { initializeApp } from 'firebase/app';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Users = lazy(() => import('./pages/Users/Users'));

const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const frontEnv = import.meta.env.VITE_FRONT_ENV;

const Router = ({ children, props }: any) => {
  return frontEnv === 'hmg' ? (
    <HashRouter {...props}>{children}</HashRouter>
  ) : (
    <BrowserRouter {...props}>{children}</BrowserRouter>
  );
};

function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: 'blackhawktreinamentos.firebaseapp.com',
      projectId: 'blackhawktreinamentos',
      storageBucket: 'blackhawktreinamentos.appspot.com',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);

    console.log('app', app);

    console.log('publicUrl ->', publicUrl);
  }, []);

  return (
    <Router basename="">
      <Switch>
        <Route path="/users">
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
          </Suspense>
        </Route>
        <Route path="/about">
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        </Route>
        <Route path="/home">
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        </Route>
        <Route path="/">
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
