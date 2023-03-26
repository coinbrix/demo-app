import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';

import Auth from './components/Auth';
import Home from './components/Home';
import NFTMarketplace from './components/NFTMarketplace';
import theme from './utils/theme';

function App() {
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log('adding event listener', new Date().getSeconds());
    window.document.body.addEventListener('Singularity-mounted', () => {
      const key = searchParams.get('key') || 2;
      localStorage.setItem('singularity-key', key);
      console.log(
        `tichnas singularity mounted with key=${key}`,
        new Date().getSeconds()
      );
      window.Singularity.init(key);

      window.SingularityEvent.subscribe('SingularityEvent-logout', () => {
        navigate('/');
        window.SingularityEvent.close();
      });
      window.SingularityEvent.subscribe('SingularityEvent-login', () => {
        navigate('/home');
        window.SingularityEvent.close();
      });

      window.SingularityEvent.subscribe('SingularityEvent-open', () =>
        setDrawerOpen(true)
      );
      window.SingularityEvent.subscribe('SingularityEvent-close', () =>
        setDrawerOpen(false)
      );

      setLoading(false);
      // setTimeout(() => setLoading(false), 3000);
    });
  }, []);

  if (loading) return null;

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
