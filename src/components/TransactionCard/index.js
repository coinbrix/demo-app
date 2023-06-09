import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Hex from 'crypto-js/enc-hex';

export default function TransactionCard({
  userId,
  showUserAddressField,
  handleBuyAsset,
}) {
  const tokens = [
    { value: 66, label: 'USDC Mumbai' },
    { value: 55, label: 'MATIC Mumbai' },
    { value: 33, label: 'MATIC Mainnet' },
    { value: 44, label: 'USDC Mainnet' },
    { value: 25, label: 'OAS_MCHC' },
    { value: 26, label: 'OAS_OAS' },
    { value: 99, label: 'MCHC_MCHC' },
    { value: 98, label: 'MCHC_OAS' },
    { value: 101, label: 'USDC_MCHC' },
    { value: 100, label: 'USDC_OAS' },
    { value: 86, label: 'RPG BSC Mainnet' },
    { value: 96, label: 'RPG BSC Testnet' },
    { value: 94, label: 'BUSD BSC Testnet' },
    { value: 103, label: 'ETH on Goerli' },
    { value: 104, label: 'USDC on Goerli' },
    { value: 105, label: 'ETH on Optimism Testnet' },
    { value: 106, label: 'USDC on Optimism Testnet' },
    { value: 201, label: 'USDC on Optimism Testnet' },
  ];
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [gamerAddress, setGamerAddress] = useState('');

  const initiateTransaction = async () => {
    setLoading(true);

    try {
      const clientReferenceId = uuidv4();

      let body = {
        clientReferenceId,
        singularityTransactionType: 'RECEIVE',
        transactionLabel: reason,
        transactionDescription: 'Description',
        transactionIconLink:
          'https://singularity-icon-assets.s3.ap-south-1.amazonaws.com/currency/matic.svg',
        clientReceiveObject: {
          clientRequestedAssetId: token,
          clientRequestedAssetQuantity: amount,
        },
      };
      if (gamerAddress) {
        body = {
          ...body,
          clientReceiveObject: {
            ...body.clientReceiveObject,
            address: gamerAddress,
          },
        };
      }

      const secret =
        'SSk49aq1/kQ1eKH7Sg+u4JsisvrycRcLopHdM6lNEMVe/p7lsSVoRiY0neFYNJkHoWVEK30bPAV2pNU2WwOJXQ==';

      console.log('Body to generate signature ---->', body);
      const requestString = JSON.stringify(body);
      const signature = Hex.stringify(hmacSHA512(requestString, secret));
      window.SingularityEvent.transactionFlow(requestString, signature, userId);
      if (gamerAddress && handleBuyAsset) {
        handleBuyAsset();
      }
    } catch (err) {
      window.alert('Some error occured');
      console.error(err);
    }

    setLoading(false);
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
      <Typography textAlign="center" mb={1}>
        Request payment from user
      </Typography>

      <FormControl fullWidth>
        {!token && (
          <InputLabel style={{ fontSize: '20px' }}>Requested Token</InputLabel>
        )}
        <Select
          value={token}
          onChange={e => setToken(e.target.value)}
          input={<OutlinedInput style={{ fontSize: '20px' }} />}
        >
          {tokens.map(({ value, label }) => (
            <MenuItem key={value} value={value} style={{ fontSize: '20px' }}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        placeholder="Requested Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="Reason for Payment"
        value={reason}
        onChange={e => setReason(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      {showUserAddressField ? (
        <TextField
          placeholder="Enter address"
          value={gamerAddress}
          onChange={e => setGamerAddress(e.target.value)}
          inputProps={{ style: { fontSize: '20px', height: '100%' } }}
          sx={{ mt: 1 }}
        />
      ) : null}

      <Button
        sx={{
          fontSize: 20,
          lineHeight: '23px',
          mt: 1,
        }}
        variant="contained"
        disabled={!amount || !token || loading}
        onClick={initiateTransaction}
      >
        {loading ? 'Loading' : 'Request'}
      </Button>
    </Box>
  );
}
