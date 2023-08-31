import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useSearchParams,
  Navigate,
} from 'react-router-dom';

import Auth from './components/Auth';
import Home from './components/Home';
import NFTMarketplace from './components/NFTMarketplace';
import theme from './utils/theme';
import foreverLoader from './assets/foreverLoader.gif';
import bgImg from './assets/auth-bg.png';

function App() {
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.document.body.addEventListener('Singularity-mounted', () => {
      console.log('----------singularity mounted--------')
      let key;
      if (searchParams.get('key')) {
        console.log('using key through url');
        key = searchParams.get('key');
      } else if (localStorage.getItem('singularity-key')) {
        console.log('using key through localStorage');
        key = localStorage.getItem('singularity-key');
      } else {
        console.log('using default key value');
        key = 2; // default key
      }
      localStorage.setItem('singularity-key', key);

      window.Singularity.init(key, async () => {
        console.log('----------singularity init callback--------')
        window.SingularityEvent.subscribe('SingularityEvent-logout', () => {
          navigate('/');
          window.SingularityEvent.close();
          window.location.reload()
        });

        window.SingularityEvent.subscribe('SingularityEvent-open', () =>
          setDrawerOpen(true)
        );

        window.SingularityEvent.subscribe('SingularityEvent-close', () => {
          console.log('subscribe close drawer ');
          setDrawerOpen(false);
        });

        window.SingularityEvent.subscribe(
          'SingularityEvent-onTransactionApproval',
          data => {
            console.log('Txn approved', JSON.parse(data));
          }
        );
        window.SingularityEvent.subscribe(
          'SingularityEvent-onTransactionSuccess',
          data => {
            console.log('Txn Successfull', JSON.parse(data));
          }
        );
        window.SingularityEvent.subscribe(
          'SingularityEvent-onTransactionFailure',
          data => {
            console.log('Txn failed', JSON.parse(data));
          }
        );

        console.log('before getting userData')
        const userData = await window.SingularityEvent.getConnectUserInfo()
        console.log('userData', userData)

        setLoading(false);

        // User logged in
        if(userData.metaData){
          navigate('/home');
        }
        else{
          // user not logged in, set up login listener
          window.SingularityEvent.subscribe('SingularityEvent-login', data => {
            console.log('login data --->', data);
            navigate('/home');
            window.SingularityEvent.close();
          });
        }
      });
    });
  }, []);

  if (loading) return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        width: '100vw',
        height: '100vh',
        backgroundSize: '100% 100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >

      <div
        style={{
          backgroundImage: `url(${foreverLoader})`,
          width: '100px',
          height: '100px',
          backgroundSize: '100% 100%',
          position: 'relative',
        }}
      />

    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      {drawerOpen && (
        <div
          onClick={() => window.SingularityEvent.close()}
          style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: 'black',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.5,
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/marketplace" element={<NFTMarketplace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

/*
demo-sandbox.s9y.gg

*/
