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

  const [clientRequestedAssetTd, setClientRequestedAssetTd] = useState('421610');
  const [marketplaceId, setMarketplaceId] = useState('RESERVOIR_MARKETPLACE');
  const [userRequestedNFTId, setUserRequestedNFTId] = useState('4903');
  const [userRequestedNFTAddress, setUserRequestedNFTAddress] = useState('0x66efaf92df6456c3cb810012b2de3fb223c25d0d');
  const [userRequestedNFTQuantity, setUserRequestedNFTQuantity] = useState('1');
  const [userRequestedNFTType, setUserRequestedNFTType] = useState(nftTypes[0].value);
  const [userRequestedNFTTradeType, setUserRequestedNFTTradeType] = useState(tradeType[0].value);
  const [userRequestedNFTPrice, setUserRequestedNFTPrice] = useState('0.0014');

  const [seaportOrderHash, setSeaportOrderHash] = useState('');
  const [seaportOrderData, setSeaportOrderData] = useState('');

  const [module, setModule] = useState('0xd8f24f5f0382e197c1e87ad82b357209383470cf');
  const [data, setData] = useState('0x760f2a0b000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d8f24f5f0382e197c1e87ad82b357209383470cf00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000005191ff9310c18000000000000000000000000000000000000000000000000000000000000078476af662900000000000000000000000000000000000000000000000000000000000000c000000000000000000000000017f547ae02a94a0339c4cfe034102423907c459200000000000000000000000017f547ae02a94a0339c4cfe034102423907c459200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000004f94ae6a03dc0000000000000000000000000000000000000000000000000000000000000072000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000005800000000000000000000000001b5cbe0440861590ba929b2d0ef819a8f5f0d454000000000000000000000000000056f7000000ece9003ca63978907a00ffd1000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000067ec385a0000000000000000000000000000000000000000000000000000000067ed0b4a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f000000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000066efaf92df6456c3cb810012b2de3fb223c25d0d00000000000000000000000000000000000000000000000000000000000013270000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004936dde6a76400000000000000000000000000000000000000000000000000004936dde6a76400000000000000000000000001b5cbe0440861590ba929b2d0ef819a8f5f0d4540000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000065dd0835c780000000000000000000000000000000000000000000000000000065dd0835c780000000000000000000000000000a26b00c1f0df003000390027140000faa71900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f7f37b26b0800000000000000000000000000000000000000000000000000005f7f37b26b080000000000000000000000002333616125c5580c2e11552775750050f4f6e7a500000000000000000000000000000000000000000000000000000000000000407fc60a3bdb9d106340d92a087e570da09f00c9535fdcd7f3b3e1a5bdfe85ea5a139780b9c2a3a999be2f5d4d364df328f1661f7a55b1044be672709d6fdedfc500000000000000000000000000000000000000000000000000000000000000a600d8f24f5f0382e197c1e87ad82b357209383470cf0000000067ec3b9a7b6f618a3ea1a9b10b3a068e0ee9dfba25e98436c70db388c79a3304e44c6e75b3a5f2b624ce8780c4f30ad4b8c752537a8b871ab43a7965bc8508962c35f3ec070000000000000000000000000000000000000000000000000000000000000000721c0078c2328597ca70f5451fff5a7b38d4e9471e0049783f008a0085193e00003d00cd54003c7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000858db1cbf6d09d447c96a11603189b49b2d1c21900000000000000000000000000000000000000000000000000001fd51290ce58000000000000000000000000000000000000000000000000000000001d4da48b00000000');
  const [value, setValue] = useState('1434999998975000');

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

      let reservoirMarketPlaceData = {}
      if(module) {
        reservoirMarketPlaceData = {
          ...reservoirMarketPlaceData,
          module: module
        }
      }

      if(module) {
        reservoirMarketPlaceData = {
          ...reservoirMarketPlaceData,
          module: module
        }
      }

      if(data) {
        reservoirMarketPlaceData = {
          ...reservoirMarketPlaceData,
          data: data
        }
      }

      if(value) {
        reservoirMarketPlaceData = {
          ...reservoirMarketPlaceData,
          value: value
        }
      }

      if(Object.keys(reservoirMarketPlaceData).length){
        userReceiveAssetDetail = {
          ...userReceiveAssetDetail,
          reservoirMarketPlaceData: reservoirMarketPlaceData
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

      <TextField
        placeholder="reservoirModule"
        label="reservoirModule"
        value={module}
        onChange={e => setModule(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="reservoirData"
        label="reservoirData"
        value={data}
        onChange={e => setData(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="reservoirValue"
        label="reservoirValue"
        value={value}
        onChange={e => setValue(e.target.value)}
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
