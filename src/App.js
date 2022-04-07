import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({})

  const googleProvider = new GoogleAuthProvider()

  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        setUser(result.user)
        console.log(result.user);
      })
      .catch(error => {
        console.error(error);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user)
        console.log(user);
      }).catch((error) => {
        console.log(error);
      });

  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  }

  return (
    <div className="App">

      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button>
          :
          <>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
            <button onClick={handleGithubSignIn}>Github Sign in</button>
          </>

      }


      <h2>Name: {user.displayName}</h2>
      <h3>Email: {user.email}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
