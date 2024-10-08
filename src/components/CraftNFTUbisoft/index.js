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

export default function CraftNFTUbisoft() {

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
    return 'CHAMPIONS_TACTICS_CRAFT_MARKETPLACE_19011'
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
    return '0.001'
  }

  const getTokenName = () => {
    return 'WOAS'
  }


  const [clientRequestedAssetTd, setClientRequestedAssetTd] = useState(getClientRequestedAssetId());
  const [marketPlaceId, setMarketPlaceId] = useState(getMarketplaceId());
  const [userRequestedParentANftId, setUserRequestedParentANftId] = useState();
  const [userRequestedParentBNftId, setUserRequestedParentBNftId] = useState();
  const [userRequestedNFTTradeType, setUserRequestedNFTTradeType] = useState(getTradeType);
  const [userRequestedNftPrice, setUserRequestedNftPrice] = useState(getNftPrice());

  const [marketplaceData, setMarketplaceData] = useState({})

  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState(0);


  const initiateTransaction = async () => {
    setLoading(true);

    try {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const recipient = (await window.SingularityEvent.getConnectUserInfo()).metaData.wallet.accounts.evmPublicAddress[0].publicAddress
      const raw = JSON.stringify({
        "parentA": userRequestedParentANftId,
        "parentB": userRequestedParentBNftId,
        "recipient": recipient
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const response = await fetch("https://s9ycc.s9y-qal.com/api/s9y-test-apis/ubisoft/craft/get-data-signature", requestOptions)
      const data = await response.json()
      console.log("api data ", data)
  
      setMarketplaceData({
        craftRelayData: data.relayData,
        craftSignature: data.relaySignature
      })

      const clientReferenceId = uuidv4();

      let body = {
        clientReferenceId,
        singularityTransactionType: 'CRAFT_NFT',
        transactionIconLink: 'https://singularity-web-assets-public.s3.ap-south-1.amazonaws.com/s9ynft.jpeg',
        transactionLabel: 'S9Y NFT',
        clientReceiveObject: {
          clientRequestedAssetId: clientRequestedAssetTd,
          address: "0xCA4511435F99dcbf3Ab7cba04C8A16721eB7b894"
        },
        userReceiveAssetDetailsList: [
          {
            marketplaceId: marketPlaceId,
            userRequestedNFTId: 0,
            userRequestedNFTAddress: "0x24e947310759fc90b0c700bAcf19151D52161D49",
            userRequestedNFTQuantity: 1,
            userRequestedNFTType: "ERC1155",
            userRequestedNFTPrice: userRequestedNftPrice,
            userRequestedNFTTradeType: userRequestedNFTTradeType,
            marketplaceData: JSON.stringify(
              {
                craftRelayData: data.relayData,
                craftSignature: data.relaySignature
              }
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
      setLoading(false);

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
        Craft NFT (Ubisoft Craft Marketplace)
      </Typography>

      <Box textAlign="center" my={1}>
        <img src={s9yNft} alt="" height="100px" />
      </Box>


      <TextField
        placeholder="Parent A Nft Id"
        label="parentANftId"
        type={'number'}
        value={userRequestedParentANftId}
        onChange={e => setUserRequestedParentANftId(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />

      <TextField
        placeholder="Parent B Nft Id"
        label="parentBNftId"
        type={'number'}
        value={userRequestedParentBNftId}
        onChange={e => setUserRequestedParentBNftId(e.target.value)}
        inputProps={{ style: { fontSize: '20px', height: '100%' } }}
        sx={{ mt: 1 }}
      />     

      <div>
        1 NFT = {getNftPrice()} {getTokenName()}
        <br />
        Price = {Number(userRequestedNftPrice) * (Number(1))} {getTokenName()}
      </div>

      <Button
        sx={{
          fontSize: 20,
          lineHeight: '23px',
          mt: 1,
        }}
        variant="contained"
        disabled={!userRequestedParentANftId || !userRequestedParentBNftId || loading}
        onClick={initiateTransaction}
      >
        {loading ? 'Loading' : 'Buy'}
      </Button>
    </Box>
  );
}
