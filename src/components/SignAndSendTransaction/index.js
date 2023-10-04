import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function SignAndSendTransaction() {
  const [message, setMessage] = useState('{"value":100000000000000,"to":"0xCA4511435F99dcbf3Ab7cba04C8A16721eB7b894"}');

  const signAndSendTxn = async () => {
    try {
      const signature = await window.SingularityEvent.signAndSendTransaction(
        JSON.parse(message)
      );

      if (signature.metaData) window.alert('Signature: ' + JSON.stringify(signature.metaData));
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
      <Typography textAlign="center">Sign and send transaction</Typography>

      <TextField
        placeholder="Enter Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        multiline
        inputProps={{ style: { fontSize: '20px', height: '200px' } }}
        sx={{ my: 3, flex: 1 }}
      />

      <Button
        sx={{
          fontSize: 20,
          lineHeight: '23px',
        }}
        variant="contained"
        disabled={!message}
        onClick={signAndSendTxn}
      >
        sign and send txn
      </Button>
    </Box>
  );
}
