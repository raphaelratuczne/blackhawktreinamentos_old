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
      apiKey: 'AIzaSyDPCsrqkYdJdIse_e6ASypCC6LVuvBSOV4',
      authDomain: 'blackhawktreinamentos.firebaseapp.com',
      projectId: 'blackhawktreinamentos',
      storageBucket: 'blackhawktreinamentos.appspot.com',
      messagingSenderId: '1032100286936',
      appId: '1:1032100286936:web:c9a70fd3b1f645491ea2ad',
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
