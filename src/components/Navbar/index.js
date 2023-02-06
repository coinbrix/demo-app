import { Box, Button } from '@mui/material';

import { ReactComponent as WalletIcon } from '../../assets/wallet.svg';

export default function Navbar() {
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'black',
        alignItems: 'center',
        py: 1.5,
        px: 5,
      }}
    >
      <Button
        onClick={() => window.SingularityEvent.open()}
        sx={{
          ml: 'auto',
          bgcolor: '#2E2E2E',
          px: 1,
          py: 0.5,
          borderRadius: 2.5,
          fontSize: 11,
          textTransform: 'none',
          color: 'white',
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        <WalletIcon />
        <span style={{ marginLeft: '5px' }}>My Account</span>
      </Button>
    </Box>
  );
}
