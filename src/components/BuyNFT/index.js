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

export default function BuyNFT() {

  const nftTypes = [
    {
      value: 'ERC721',
      label: 'ERC721',
    },
    {
      value: 'ERC1155',
      label: 'ERC1155',
    },
  ];

  const tradeType = [
    {
      value: 'BUY',
      label: 'BUY',
    },
    {
      value: 'BID',
      label: 'BID',
    },
  ];

  const [clientRequestedAssetTd, setClientRequestedAssetTd] = useState();
  const [marketplaceId, setMarketplaceId] = useState('');
  const [userRequestedNFTId, setUserRequestedNFTId] = useState('');
  const [userRequestedNFTAddress, setUserRequestedNFTAddress] = useState('');
  const [userRequestedNFTQuantity, setUserRequestedNFTQuantity] = useState('');
  const [userRequestedNFTType, setUserRequestedNFTType] = useState(nftTypes[0].value);
  const [userRequestedNFTTradeType, setUserRequestedNFTTradeType] = useState(tradeType[0].value);
  const [userRequestedNFTPrice, setUserRequestedNFTPrice] = useState('');

  const [seaportOrderHash, setSeaportOrderHash] = useState('');
  const [seaportOrderData, setSeaportOrderData] = useState('');

  const [loading, setLoading] = useState(false);

  const initiateTransaction = async () => {
    setLoading(true);

    try {
      const clientReferenceId = uuidv4();

      let seaportData = {}
      if(seaportOrderHash){
        seaportData = {
          ...seaportData,
          seaportOrderHash: seaportOrderHash
        }
      }

      if(seaportOrderData){
        seaportData = {
          ...seaportData,
          seaportOrderData: seaportOrderData
        }
      }

      let userReceiveAssetDetail = {}
      if(marketplaceId){
        userReceiveAssetDetail = {
          ...userReceiveAssetDetail,
          marketplaceId: marketplaceId
        }
      }

      if(userRequestedNFTId){
        userReceiveAssetDetail = {
          ...userReceiveAssetDetail,
          userRequestedNFTId: userRequestedNFTId
        }
      }

      if(userRequestedNFTAddress){
        userReceiveAssetDetail = {
          ...userReceiveAssetDetail,
          userRequestedNFTAddress: userRequestedNFTAddress
        }
      }

      if(userRequestedNFTQuantity){
        userReceiveAssetDetail = {
          ...userReceiveAssetDetail,
          userRequestedNFTQuantity: userRequestedNFTQuantity
        }
      }

      if(userRequestedNFTType){
        userReceiveAssetDetail = {
          ...userReceiveAssetDetail,
          userRequestedNFTType: userRequestedNFTType
        }
      }

      if(userRequestedNFTPrice){
        userReceiveAssetDetail = {
          ...userReceiveAssetDetail,
          userRequestedNFTPrice: userRequestedNFTPrice
        }
      }

      if(userRequestedNFTTradeType){
        userReceiveAssetDetail = {
          ...userReceiveAssetDetail,
          userRequestedNFTTradeType: userRequestedNFTTradeType
        }
      }

      if(Object.keys(seaportData).length){
        userReceiveAssetDetail = {
          ...userReceiveAssetDetail,
          seaportData: seaportData
        }
      }

      let body = {
        clientReferenceId,
        singularityTransactionType: 'NFT_PURCHASE',
        clientReceiveObject: {
          clientRequestedAssetId: clientRequestedAssetTd,
          address: "0xCA4511435F99dcbf3Ab7cba04C8A16721eB7b894"
        },
        transactionIconLink: 'https://singularity-web-assets-public.s3.ap-south-1.amazonaws.com/s9ynft.jpeg',
        transactionLabel: 'S9Y NFT',
        userReceiveAssetDetailsList: [userReceiveAssetDetail]
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

      <FormControl fullWidth>
        {!nftTypes && (
          <InputLabel style={{ fontSize: '20px' }}>Requested NFT Type</InputLabel>
        )}
        <Select
          value={userRequestedNFTType}
          onChange={e => setUserRequestedNFTType(e.target.value)}
          input={<OutlinedInput style={{ fontSize: '20px' }} />}
        >
          {nftTypes.map(({ value, label }) => (
            <MenuItem key={value} value={value} style={{ fontSize: '20px' }}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        {!tradeType && (
          <InputLabel style={{ fontSize: '20px' }}>Requested Trade Type</InputLabel>
        )}
        <Select
          value={userRequestedNFTTradeType}
          onChange={e => setUserRequestedNFTTradeType(e.target.value)}
          input={<OutlinedInput style={{ fontSize: '20px' }} />}
        >
          {tradeType.map(({ value, label }) => (
            <MenuItem key={value} value={value} style={{ fontSize: '20px' }}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Requested Aseet ID"
        placeholder="Requested Aseet ID"
        value={clientRequestedAssetTd}
        onChange={e => setClientRequestedAssetTd(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        label="Market placed id"
        placeholder="Market placed id"
        value={marketplaceId}
        onChange={e => setMarketplaceId(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="user requested nft id"
        label="user requested nft id"
        value={userRequestedNFTId}
        onChange={e => setUserRequestedNFTId(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="user requested nft address"
        label="user requested nft address"
        value={userRequestedNFTAddress}
        onChange={e => setUserRequestedNFTAddress(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="user requested nft quantity"
        label="user requested nft quantity"
        value={userRequestedNFTQuantity}
        onChange={e => setUserRequestedNFTQuantity(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="user requested nft price"
        label="user requested nft price"
        value={userRequestedNFTPrice}
        onChange={e => setUserRequestedNFTPrice(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="seaportOrderHash"
        label="seaportOrderHash"
        value={seaportOrderHash}
        onChange={e => setSeaportOrderHash(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="seaportOrderData"
        label="seaportOrderData"
        value={seaportOrderData}
        onChange={e => setSeaportOrderData(e.target.value)}
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
        disabled={!userRequestedNFTType || loading}
        onClick={initiateTransaction}
      >
        {loading ? 'Loading' : 'Request'}
      </Button>
    </Box>
  );
}
