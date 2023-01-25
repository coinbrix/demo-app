import { Box, Button } from '@mui/material';

export default function Navbar() {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'black' }}>
      <Button
        onClick={() => window.SingularityEvent.open()}
        sx={{ ml: 'auto' }}
      >
        My Account
      </Button>
    </Box>
  );
}
