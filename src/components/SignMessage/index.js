import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function SignMessage() {
  const [message, setMessage] = useState('');

  const requestPersonalSignature = async () => {
    try {
      const signature = await window.SingularityEvent.requestPersonalSignature(
        message
      );

      if (signature.metaData) window.alert('Signature: ' + signature.metaData);
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
      <Typography textAlign="center">Sign a blockchain message</Typography>

      <TextField
        placeholder="Enter Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        multiline
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ my: 3, flex: 1 }}
      />

      <Button
        sx={{
          fontSize: 20,
          lineHeight: '23px',
        }}
        variant="contained"
        disabled={!message}
        onClick={requestPersonalSignature}
      >
        Request signature
      </Button>
    </Box>
  );
}
