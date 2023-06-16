import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import { initializeApp } from 'firebase/app';

function App() {
  const [count, setCount] = useState(0);

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
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>teste deploy 3</p>
      <p>cria branch prod</p>
    </>
  );
}

export default App;
