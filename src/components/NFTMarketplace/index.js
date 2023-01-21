import { Box, Typography } from '@mui/material';

import bgImg from '../../assets/marketplace-bg.png';
import NFTCard from '../NFTCard';

export default function NFTMarketplace() {
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
      <Typography sx={{ pt: 5, textAlign: 'center', color: 'primary.main' }}>
        NFT MARKETPLACE
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ md: 'repeat(2, 410px)' }}
        justifyContent="space-between"
        mt={4}
        mx={10}
        rowGap={5}
      >
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
      </Box>
    </div>
  );
}
