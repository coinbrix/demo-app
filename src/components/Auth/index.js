import { Button, Container, Typography, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';

import bgImg from '../../assets/auth-bg.png';
import TransactionCard from '../TransactionCard';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC1UdTj35lNKnuXR23FmoNkJQcRikumUUE",
  authDomain: "web3-auth-test.firebaseapp.com",
  projectId: "web3-auth-test",
  storageBucket: "web3-auth-test.appspot.com",
  messagingSenderId: "251658538692",
  appId: "1:251658538692:web:d5b8f1ff91a7f0a9b04391",
  measurementId: "G-NKL9CNNEST"
};


const DEMO_AUTH_LOCK = new Auth0Lock("RT5p8TX5jby2jyJa6FEQOBslAaVVBsVf", "neobrix-gamepay.us.auth0.com", {
  container: "gamepay-auth0-container-demo",
  allowedConnections: ['google-oauth2'],
  auth: {
    redirect: false,
    responseType: 'token id_token'
  },
  theme: {
    logo: "",
    authButtons: {
      facebook: {
        primaryColor: '#2E2E2E'
      },
      // 'google-oauth2': {
      //   primaryColor: '#2E2E2E',
      //   foregroundColor: '#FFFFFF'
      // }
    }
  },
  popupOptions: { width: 400, height: 400, left: 1200, top: 200 },
  languageDictionary: {
    title: ""
  },
  forceAutoHeight: true
});
export default function Auth() {
  const [showBuyAssetForm, toggleShowBuyAssetForm] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("amit@neobrix.io")
  const [password, setPassword] = useState("12345678")

  const login = async () => {
    try {
      const loggedIn = await checkLogin();

      if (!loggedIn) await window.SingularityEvent.open();
    } catch (err) {
      console.error(err);
    }
  };

  const checkLogin = async () => {
    try {
      console.log('checking login');
      const user = await window.SingularityEvent.getConnectUserInfo();
      console.log('user data', user);

      if (user && user.metaData) {
        navigate('/home');
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    return false;
  };

  const handleBuyAsset = () => {
    toggleShowBuyAssetForm(v => !v);
  };

  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    checkLogin();
    DEMO_AUTH_LOCK.show();
    DEMO_AUTH_LOCK.on("authenticated", function (result) {
      // window.SingularityEvent.open();
      window.SingularityEvent.customAuth('AUTH0', {
        idToken: result.idToken,
        accessToken: result.accessToken
      })
    });
  }, []);

  const handleFirebaseLogin = () => {
    const auth = getAuth();
    // signInWithEmailAndPassword(auth, "amitsharmamail101@gmail.com", "12345678")
    // createUserWithEmailAndPassword(auth, "amit@neobrix.io", "12345678")
    signInWithEmailAndPassword(auth, email, password)
      // signInWithEmailAndPassword(auth, "virus.sharma79@gmail.com", "12345678")
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('firebase login user', user)
        const accessToken = user.accessToken
        console.log('accessToken', accessToken)
        const idToken1 = await user.getIdToken(true)
        console.log('idToken1', idToken1)

        window.SingularityEvent.customAuth('FIREBASE', {
          idToken: idToken1,
          accessToken: accessToken
        })
      })
      .catch((error) => {
        console.log('firebase login error', error)

        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        width: '100vw',
        height: '100vh',
        backgroundSize: '100% 100%',
        position: 'relative',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'fixed',
          transform: 'translate(-50%,-50%)',
          left: '50%',
          top: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            py: [4, 8],
            px: [5, 10],
            bgcolor: 'rgba(19, 19, 20, 0.61)',
            borderRadius: 6,
            color: 'primary.main',
            fontSize: [26, 52],
            lineHeight: 1,
          }}
        >
          demo game
        </Typography>

        <Typography mt={4} mb={8} color="white" fontSize={[16, 24]}>
          IN THE CITY OF GANGSTERS YOU Lorem ipsum dolor sit amet, consectetur
          <br />
          adipiscing elit, sed do eiusmod tempor incididunt ut
        </Typography>

        <Button onClick={login} variant="contained">
          sign in to continue
        </Button>
        <Button
          onClick={handleBuyAsset}
          variant="outlined"
          sx={{
            marginTop: '10px',
          }}
        >
          Buy Asset
        </Button>

        <div id="auth-container-demo">
          <div id="gamepay-auth0-container-demo"></div>
        </div>

        <div>
          <Container
            sx={{
              // position: 'fixed',
              // top: '20%',
              zIndex: 2,
              background: 'white',
              width: 'fit-content',
            }}
          >
          <TextField
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputProps={{ style: { fontSize: '20px', height: '100%' } }}
            sx={{ mt: 1 }}
          />

            <TextField
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              inputProps={{ style: { fontSize: '20px', height: '100%' } }}
              sx={{ mt: 1 }}
            />

            <Button
              sx={{
                fontSize: 20,
                lineHeight: '23px',
                mt: 1,
              }}
              variant="contained"
              // disabled={!amount || !token || loading}
              onClick={handleFirebaseLogin}
            >Firebase Login </Button>

          </Container>
        {/*  <input/>Password<input/>*/}
        {/*  <button>Submit</button>*/}
        </div>

        {showBuyAssetForm ? (
          <Container
            sx={{
              position: 'fixed',
              top: '20%',
              zIndex: 2,
              background: 'white',
              width: 'fit-content',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                right: '2%',
                top: '2%',
                cursor: 'pointer',
                padding: '10px',
                background: '#F9AA16',
                borderRadius: '100%',
                width: '10px',
                height: '10px',
                lineHeight: '10px',
              }}
              onClick={handleBuyAsset}
            >
              X
            </Box>
            <TransactionCard
              handleBuyAsset={handleBuyAsset}
              showUserAddressField
            />
          </Container>
        ) : null}
      </Container>
    </div>
  );
}
