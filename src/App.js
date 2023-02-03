import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Auth from './components/Auth';
import Home from './components/Home';
import NFTMarketplace from './components/NFTMarketplace';
import theme from './utils/theme';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('adding event listener', new Date().getSeconds());
    window.document.body.addEventListener('Singularity-mounted', () => {
      console.log('tichnas singularity mounted', new Date().getSeconds());
      window.Singularity.init(2);
      setLoading(false);
      // setTimeout(() => setLoading(false), 3000);
    });
  }, []);

  if (loading) return null;

  return (
    <ThemeProvider theme={theme}>
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
