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
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Hex from 'crypto-js/enc-hex';
import s9yNft from '../../assets/s9ynft.jpeg';

export default function BuySingleNFT() {

  const nftTypes = [
    {
      value: 'ERC1155',
      label: 'ERC1155',
    },
  ];

  const tradeType = [
    {
      value: 'BUY',
      label: 'BUY',
    }
  ];

  const [clientRequestedAssetTd, setClientRequestedAssetTd] = useState('800010');
  const [marketPlaceId, setMarketPlaceId] = useState('MARKETPLACE_1');
  const [userRequestedNftId, setUserRequestedNftId] = useState('0');
  const [userRequestedNftAddress, setUserRequestedNftAddress] = useState('0x572954A0db4bdA484CebbD6e50dBA519d35230Bc');
  const [userRequestedNftQuantity, setUserRequestedNftQuantity] = useState('');
  const [userRequestedNftType, setUserRequestedNftType] = useState('ERC1155');
  const [userRequestedNFTTradeType, setUserRequestedNFTTradeType] = useState('BUY');
  const [userRequestedNftPrice, setUserRequestedNftPrice] = useState('1');
  const [loading, setLoading] = useState(false);

  const initiateTransaction = async () => {
    setLoading(true);

    try {
      const clientReferenceId = uuidv4();

      let body = {
        clientReferenceId,
        singularityTransactionType: 'NFT_PURCHASE',
        transactionIconLink: 'https://singularity-web-assets-public.s3.ap-south-1.amazonaws.com/s9ynft.jpeg',
        transactionLabel: 'S9Y Token',
        clientReceiveObject: {
          clientRequestedAssetId: clientRequestedAssetTd,
        },
        userReceiveAssetDetailsList: [
          {
            marketplaceId: marketPlaceId,
            userRequestedNFTId: userRequestedNftId,
            userRequestedNFTAddress: userRequestedNftAddress,
            userRequestedNFTQuantity: userRequestedNftQuantity,
            userRequestedNFTType: userRequestedNftType,
            userRequestedNFTPrice: userRequestedNftPrice,
            userRequestedNFTTradeType: userRequestedNFTTradeType
          }
        ]
      };
      const secret =
        'SSk49aq1/kQ1eKH7Sg+u4JsisvrycRcLopHdM6lNEMVe/p7lsSVoRiY0neFYNJkHoWVEK30bPAV2pNU2WwOJXQ==';

      console.log('Body to generate signature ---->', body);
      const requestString = JSON.stringify(body);
      const signature = Hex.stringify(hmacSHA512(requestString, secret));
      window.SingularityEvent.transactionFlow(requestString, signature);
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
        Buy NFT
      </Typography>

      <Box textAlign="center" my={1}>
        <img src={s9yNft} alt="" height="100px" />
      </Box>


      <TextField
        placeholder="user requested nft quantity"
        label="user requested nft quantity"
        value={userRequestedNftQuantity}
        onChange={e => setUserRequestedNftQuantity(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <Button
        sx={{
          fontSize: 20,
          lineHeight: '23px',
          mt: 1,
        }}
        variant="contained"
        disabled={!userRequestedNftType || loading}
        onClick={initiateTransaction}
      >
        {loading ? 'Loading' : 'Buy'}
      </Button>
    </Box>
  );
}
