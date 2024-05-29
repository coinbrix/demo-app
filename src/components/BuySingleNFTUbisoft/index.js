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
import { useSearchParams } from 'react-router-dom';

export default function BuySingleNFTUbisoft() {

  const [searchParams] = useSearchParams();

  const getKey = () => {
    let key;
    if (searchParams.get('key')) {
      key = searchParams.get('key');
    } else if (localStorage.getItem('singularity-key')) {
      key = localStorage.getItem('singularity-key');
    } else {
      key = 2; // default key
    }
    localStorage.setItem('singularity-key', key);
    return key;
  }

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

  const getClientRequestedAssetId = () => {
    return '19011000'
  }

  const getMarketplaceId = () => {
    return 'UBISOFT_MARKETPLACE_19011'
  }

  const getNftId = () => {
    return '0'
  }

  const getNftAddress = () => {
    return '0x17805889212E24D785A842BA03279543b4a14B9F'
  }

  const getNftType = () => {
    return 'ERC1155'
  }

  const getTradeType = () => {
    return 'BUY'
  }

  const getNftPrice = () => {
    return '0.01'
  }

  const getTokenName = () => {
    return 'WOAS'
  }


  const [clientRequestedAssetTd, setClientRequestedAssetTd] = useState(getClientRequestedAssetId());
  const [marketPlaceId, setMarketPlaceId] = useState(getMarketplaceId());
  const [userRequestedNftId, setUserRequestedNftId] = useState(getNftId());
  const [userRequestedNftAddress, setUserRequestedNftAddress] = useState(getNftAddress());
  const [userRequestedNftQuantity, setUserRequestedNftQuantity] = useState('');
  const [userRequestedNftType, setUserRequestedNftType] = useState(getNftType);
  const [userRequestedNFTTradeType, setUserRequestedNFTTradeType] = useState(getTradeType);
  const [userRequestedNftPrice, setUserRequestedNftPrice] = useState(getNftPrice());
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState(0);

  const initiateTransaction = async () => {
    setLoading(true);

    try {
      const clientReferenceId = uuidv4();

      const marketplaceData = {
        requestId: requestId,
        additionalFees: [],
        additionalFeeRecipients: []
      }

      let body = {
        clientReferenceId,
        singularityTransactionType: 'NFT_PURCHASE',
        transactionIconLink: 'https://singularity-web-assets-public.s3.ap-south-1.amazonaws.com/s9ynft.jpeg',
        transactionLabel: 'S9Y NFT',
        clientReceiveObject: {
          clientRequestedAssetId: clientRequestedAssetTd,
          address: "0xCA4511435F99dcbf3Ab7cba04C8A16721eB7b894"
        },
        userReceiveAssetDetailsList: [
          {
            marketplaceId: marketPlaceId,
            userRequestedNFTId: userRequestedNftId,
            userRequestedNFTAddress: userRequestedNftAddress,
            userRequestedNFTQuantity: userRequestedNftQuantity,
            userRequestedNFTType: userRequestedNftType,
            userRequestedNFTPrice: userRequestedNftPrice,
            userRequestedNFTTradeType: userRequestedNFTTradeType,
            marketplaceData: JSON.stringify(
              marketplaceData
            )
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
        Buy NFT (Ubisoft Sequence Marketplace)
      </Typography>

      <Box textAlign="center" my={1}>
        <img src={s9yNft} alt="" height="100px" />
      </Box>


      <TextField
        placeholder="Quantity"
        label="Quantity"
        type={'number'}
        value={userRequestedNftQuantity}
        onChange={e => setUserRequestedNftQuantity(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="Sequence Request Id (Default is 0)"
        label="RequestId"
        type={'number'}
        value={requestId}
        onChange={e => setRequestId(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />     

      <div>
        1 NFT = {getNftPrice()} {getTokenName()}
        <br />
        Price = {Number(userRequestedNftPrice) * (Number(userRequestedNftQuantity))} {getTokenName()}
      </div>

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
