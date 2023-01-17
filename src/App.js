import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import NFTMarketplace from './components/NFTMarketplace';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<NFTMarketplace />} />
    </Routes>
  );
}

export default App;
