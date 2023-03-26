import { Box, Button, Divider, Typography, TextField, FormControl, InputLabel, Select, OutlinedInput, MenuItem } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Hex from 'crypto-js/enc-hex';
import s9yNft from '../../assets/s9ynft.jpeg';
export default function NFTCard({ nft, userId }) {
  const {
    balance,
    contractMetadata: { symbol },
    description,
    media,
    title,
  } = nft;

  const image = media[0].thumbnail;

  const tokens = [
    { value: 66, label: 'USDC On Polygon Mumbai' },
    { value: 55, label: 'MATIC On Polygon Mumbai' },
  ];

  const issuingAssets = [
    { value: 111, label: 'S9Y NFT on Polygon Mumbai' },
    { value: 222, label: 'S9Y Token on Polygon Mumbai' },
    { value: 333, label: 'S9Y NFT on Ethereum Sepolia' },
    { value: 444, label: 'S9Y Token on Ethereum Sepolia' },
  ];
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [assetQuantity, setAssetQuantity] = useState('1');
  const [assetId, setAssetId] = useState('');
  const [loading, setLoading] = useState(false);

  const initiateTransaction = async () => {
    setLoading(true);

    try {
      const clientReferenceId = uuidv4();

      const body = {
        clientReferenceId,
        userId,
        singularityTransactionType: 'EXCHANGE',
        clientReceiveObject: {
          clientRequestedAssetId: token,
        },
        clientExchangeAssetDetailsList: [
          {
            userRequestedAssetQuantity: assetQuantity,
            userRequestedAssetId: assetId,
            clientRequestedAssetQuantity: amount,
            userRequestedNFTTokenId: '0',
            singularityTransactionExchangeMode: 'CONTRACT',
          },
        ],
      };

      const secret = 'SSk49aq1/kQ1eKH7Sg+u4JsisvrycRcLopHdM6lNEMVe/p7lsSVoRiY0neFYNJkHoWVEK30bPAV2pNU2WwOJXQ==';
      const requestString = JSON.stringify(body)
      const signature = Hex.stringify(hmacSHA512(requestString, secret));

      // const cerebro_prefix = 'https://cerebro.s9y';
      // let baseEndpoint = `${cerebro_prefix}-qal.com`; // default qal env
      // if (process.env.REACT_APP_ENV === 'production') {
      //   baseEndpoint = `${cerebro_prefix}.gg`;
      // } else if (process.env.REACT_APP_ENV === 'sandbox') {
      //   baseEndpoint = `${cerebro_prefix}-sandbox.gg`;
      // }

      // const res = await axios.post(
      //   `${baseEndpoint}/v1/sdk-server-protected/create_singularity_initial_txn`,
      //   body,
      //   {
      //     headers: {
      //       'x-api-key': 2,
      //       'X-api-signature': signature,
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );
      // console.log('nft create txn api response --->', res);
      // window.SingularityEvent.nftFlow('INIT_NFT_PAYMENT', res.data);
      window.SingularityEvent.transactionFlowNew(requestString, signature);
    } catch (err) {
      window.alert('Some error occured');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        border: '6px solid',
        borderColor: 'primary.main',
        bgcolor: '#EBA82699',
        width: ['100%', 410],
        p:3,
        boxSizing: 'border-box',
      }}
    >
      <Box textAlign="center" my={1}>
        <img src={s9yNft} alt="" height="100px" />
      </Box>

      <FormControl fullWidth>
          {!assetId && (
            <InputLabel style={{ fontSize: '20px' }}>Requested Exchange Asset</InputLabel>
          )}
          <Select
            value={assetId}
            onChange={e => setAssetId(e.target.value)}
            input={<OutlinedInput style={{ fontSize: '20px' }} />}
          >
            {issuingAssets.map(({ value, label }) => (
              <MenuItem key={value} value={value} style={{ fontSize: '20px' }}>
                {label}
              </MenuItem>
            ))}
          </Select>
      </FormControl>


      {/* <Typography fontSize={18}>{title}</Typography> */}



      <FormControl fullWidth sx={{ mt: 1 }}>
            {!token && (
              <InputLabel style={{ fontSize: '20px' }}>Requested Payment Token</InputLabel>
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

        {/* for testing */}
      <TextField
        fullWidth
        type="number"
        placeholder="Select Payment Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />


        <Typography fontSize={14} mx={4}>
          {description}
        </Typography>

        <Divider sx={{ height: 4, bgcolor: 'primary.main', mt: 1.5, mx: 1 }} />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={1}
        >
          <Button
            sx={{
              fontSize: [14, 16],
              lineHeight: '18px',
              px: 2,
              whiteSpace: 'nowrap',
              color: 'white',
            }}
          >
            add to cart
          </Button>
          <Button
            sx={{
              fontSize: [14, 16],
              lineHeight: '18px',
              px: [5, 7],
              whiteSpace: 'nowrap',
            }}
            variant="contained"
            onClick={initiateTransaction}
          >
            {loading ? 'Processing...' : 'buy now'}
          </Button>
        </Box>

    </Box>
  );
}
