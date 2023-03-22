import { Box, Button, Divider, Typography, TextField } from '@mui/material';
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
    { value: 66, label: 'USDC' },
    { value: 55, label: 'MATIC' },
  ];
  const [token, setToken] = useState('55');
  const [amount, setAmount] = useState('0.1');
  const [assetQuantity, setAssetQuantity] = useState('1');
  const [assetId, setAssetId] = useState('111');
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

      const secret =
        'SSk49aq1/kQ1eKH7Sg+u4JsisvrycRcLopHdM6lNEMVe/p7lsSVoRiY0neFYNJkHoWVEK30bPAV2pNU2WwOJXQ==';
      const signature = Hex.stringify(hmacSHA512(JSON.stringify(body), secret));

      const cerebro_prefix = 'https://cerebro.s9y';
      let baseEndpoint = `${cerebro_prefix}-qal.com`; // default qal env
      if (process.env.REACT_APP_ENV === 'production') {
        baseEndpoint = `${cerebro_prefix}.gg`;
      } else if (process.env.REACT_APP_ENV === 'sandbox') {
        baseEndpoint = `${cerebro_prefix}-sandbox.gg`;
      }

      const res = await axios.post(
        `${baseEndpoint}/v1/sdk-server-protected/create_singularity_initial_txn`,
        body,
        {
          headers: {
            'x-api-key': localStorage.getItem('singularity-key'),
            'X-api-signature': signature,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('nft create txn api response --->', res);
      window.SingularityEvent.nftFlow('INIT_NFT_PAYMENT', res.data);
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
        boxSizing: 'border-box',
      }}
    >
      <Box textAlign="center" my={1}>
        <img src={s9yNft} alt="" height="100px" />
      </Box>

      <Box color="white">
        <Box display="flex" justifyContent="space-between" mb={1.5} mx={4}>
          <Typography fontSize={18}>{title}</Typography>

          <Box display="flex" alignItems="center">
            {/* for testing */}
            <TextField
              type="number"
              placeholder="Select quantity"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              inputProps={{
                style: { fontSize: '14px', height: '20px', width: '50px' },
              }}
              sx={{ mr: 1 }}
            />
            <Typography fontSize={18}>
              {/* {balance}  */}
              {symbol}
            </Typography>
          </Box>
        </Box>

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
    </Box>
  );
}
