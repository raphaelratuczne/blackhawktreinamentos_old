import { useEffect, useState } from 'react';
// import './Login.scss';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  browserSessionPersistence,
  setPersistence,
  onAuthStateChanged,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';

const Login = () => {
  const [user, setUser] = useState<any | null>(null);
  const [email, setEmail] = useState<string>('metalraziel@gmail.com');

  useEffect(() => {
    console.log('login->');
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      }
    });
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let em = window.localStorage.getItem('emailForSignIn');
      if (!em) {
        em = window.prompt('Por favor, informe seu email para login');
      }
      signInWithEmailLink(auth, em as string, window.location.href)
        .then(result => {
          window.localStorage.removeItem('emailForSignIn');
          console.log('result', result);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, []);

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const auth = getAuth();
    auth.languageCode = 'pt';
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log('token', token);
      console.log('user', user);
    } catch (error: any) {
      console.log('error', error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log('errorCode', errorCode);
      console.log('errorMessage', errorMessage);
      console.log('email', email);
      console.log('credential', credential);
    }
  };

  const loginEmail = async () => {
    try {
      const actionCodeSettings = {
        url: 'http://127.0.0.1:5173/login',
        handleCodeInApp: true,
      };
      window.localStorage.setItem('emailForSignIn', email);
      const auth = getAuth();
      auth.languageCode = 'pt';
      await setPersistence(auth, browserSessionPersistence);
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert('Um link foi enviado para o seu email');
    } catch (e) {
      console.log('error', e);
    }
  };

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="Login">
      <p>Login</p>
      {user && <p>{user.displayName}</p>}
      {user && user.email ? (
        <button type="button" onClick={logout}>
          Logout
        </button>
      ) : (
        <>
          <button type="button" onClick={loginGoogle}>
            Login com o Google
          </button>
          <br />
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="button" onClick={loginEmail}>
            Login com o Email
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
