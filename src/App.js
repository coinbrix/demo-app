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
    window.document.body.addEventListener('Singularity-mounted', () => {
      window.Singularity.init(2);
      setLoading(false);
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
