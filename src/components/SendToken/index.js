import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function SendToken() {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  const handleSendToken = async () => {
    try {
      const sendTokenResponse =
        await window.SingularityEvent.signAndSendTransaction({
          amount,
          address,
        });
      console.log('sendTokenResponse --->', sendTokenResponse);
      if (sendTokenResponse)
        window.alert(
          'Send Token Response: ' + JSON.stringify(sendTokenResponse)
        );
    } catch (err) {
      console.error(err);
      window.alert('Some error occured');
    }
  };

  return (
    <Box
      sx={{
        border: '6px solid white',
        bgcolor: '#FFFFFFA6',
        width: ['100%', 410],
        boxSizing: 'border-box',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography textAlign="center">Send Token</Typography>

      <TextField
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ my: 3, flex: 1 }}
      />
      <TextField
        placeholder="Enter address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ my: 3, flex: 1 }}
      />

      <Button
        sx={{
          fontSize: 20,
          lineHeight: '23px',
        }}
        variant="contained"
        disabled={!amount || !address}
        onClick={handleSendToken}
      >
        Send Token
      </Button>
    </Box>
  );
}
