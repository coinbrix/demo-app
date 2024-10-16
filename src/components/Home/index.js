import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import bgImg from '../../assets/marketplace-bg.png';
import MiscOperations from '../MiscOperations';
import Navbar from '../Navbar';
import NFTCard from '../NFTCard';
import SignMessage from '../SignMessage';
import TransactionCard from '../TransactionCard';
import SendToken from '../SendToken';
import SignAndSendTransaction from '../SignAndSendTransaction';
import SignTransaction from '../SignTransaction';
import BuyNFT from '../BuyNFT';
import BuySingleNFT from '../BuySingleNFT';
import BuyBulkNFT from '../BuyBulkNFT';
import BuySingleNFTUbisoft from '../BuySingleNFTUbisoft';
import BuySingleERC721NFTUbisoft from '../BuySingleERC721NFTUbisoft';
import CraftNFTUbisoft from '../CraftNFTUbisoft';

export default function Home() {
  const [name, setName] = useState();
  const navigate = useNavigate();
  const [userId, setUserId] = useState();

  useEffect(() => {
    (async function () {
      const userData = await window.SingularityEvent.getConnectUserInfo();
      const metadata = userData?.metaData;
      if (!metadata) return navigate('/');
      const { mode } = metadata;
      if (mode === 'social') {
        setUserId(metadata?.userMetaData?.userId);
        setName(metadata?.userMetaData?.given_name);
      } else if (mode === 'web3') {
        setUserId(metadata.userId);
      }
    })();
  });

  const data = {
    nftResponse:
      '{"ownedNfts":[{"contract":{"address":"0x397a7f59cc8e47854df20116ff0c0aa370371c49"},"id":{"tokenId":"0x0000000000000000000000000000000000000000000000000000000000016489","tokenMetadata":{"tokenType":"ERC721"}},"balance":"0.1","title":"S9Y Test NFT #0","description":"","tokenUri":{"raw":"https://api.blockvatar.com/v1/blockvatars/91273","gateway":"https://api.blockvatar.com/v1/blockvatars/91273"},"media":[{"raw":"ipfs://bafkreifvjazoizyeb7vcontmbjctnzziviy4xtws4dokmz5hxbwxjpu3fu","gateway":"https://nft-cdn.alchemy.com/matic-mainnet/a7abb3a40db45bb8f3d6a226ece9506c","thumbnail":"https://res.cloudinary.com/alchemyapi/image/upload/thumbnail/matic-mainnet/a7abb3a40db45bb8f3d6a226ece9506c","format":"png","bytes":78778}],"metadata":{"name":"Blockvatar #91273","description":"This is a common Blockvatar. Although common, every Blockvatar is unique and there will never be two of the same!","image":"ipfs://bafkreifvjazoizyeb7vcontmbjctnzziviy4xtws4dokmz5hxbwxjpu3fu","external_url":"https://blockvatar.com/blockvatars/91273","attributes":[{"value":"Common","trait_type":"Type"},{"value":"Seagull","trait_type":"Background Color"},{"value":"Verdigris","trait_type":"Body Color"},{"value":"Sweating","trait_type":"Head"},{"value":"Fake Smile","trait_type":"Eyes"},{"value":"Ticking Lips","trait_type":"Mouth"},{"value":"Loose Denim Overall","trait_type":"Outfit"},{"value":"Axe on Head","trait_type":"Item"}]},"timeLastUpdated":"2022-12-20T18:53:59.785Z","contractMetadata":{"name":"S9Y-ERC1155#0","symbol":"MATIC","tokenType":"ERC1155","contractDeployer":"0x1aec1f531a0b11819b83bfa8b063042a90cfee06","deployedBlockNumber":25203491,"openSea":{"lastIngestedAt":"2023-01-21T14:40:01.000Z"}}}],"totalCount":1,"blockHash":"0x5663c5de8a3d98efd99e023a2281754d64c304f76947960ad142e42459ab4c45"}',
    status: 'SUCCESS',
    error: null,
  };

  const NFTs = JSON.parse(data.nftResponse).ownedNfts;
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        minHeight: '100vh',
        backgroundSize: '100% 100%',
        position: 'relative',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />

      <Typography
        sx={{
          textAlign: 'center',
          color: 'white',
          textTransform: 'uppercase',
          my: 1,
        }}
      >
      </Typography>

      <Box
        display="grid"
        gridAutoFlow="column"
        gridTemplateRows={{
          xs: 'repeat(6, min-content)',
          md: 'repeat(3, min-content)',
        }}
        justifyContent={'space-between'}
        justifyItems={'center'}
        mx={[1, 10]}
        pb={[2, 0]}
        rowGap={4}
      >
        <Typography
          sx={{ lineHeight: 1, textAlign: 'center', color: 'primary.main' }}
        >
          TRY PAYMENT TRANSACTIONS
        </Typography>
        <TransactionCard userId={userId} />
        <NFTCard nft={NFTs[0]} userId={userId} />

        <Typography
          sx={{ lineHeight: 1, textAlign: 'center', color: 'primary.main' }}
        >
          TRY OTHER FEATURES
        </Typography>
        <SignMessage />
        <MiscOperations />
      </Box>
      <Box style={{ marginLeft: '100px', marginTop: '100px' }}>
        <SendToken />
      </Box>

      <Box style={{ marginLeft: '100px', marginTop: '100px' }}>
        <SignAndSendTransaction />
      </Box>

      <Box style={{ marginLeft: '100px', marginTop: '100px' }}>
        <SignTransaction />
      </Box>

      <Box style={{ marginLeft: '100px', marginTop: '100px' }}>
        <BuySingleNFT />
      </Box>

      <Box style={{ marginLeft: '100px', marginTop: '100px' }}>
        <BuyBulkNFT />
      </Box>

      <Box style={{ marginLeft: '100px', marginTop: '100px' }}>
        <BuySingleNFTUbisoft />
      </Box>

      <Box style={{ marginLeft: '100px', marginTop: '100px' }}>
        <BuySingleERC721NFTUbisoft />
      </Box>


      <Box style={{ marginLeft: '100px', marginTop: '100px' }}>
        <CraftNFTUbisoft />
      </Box>


      <Box style={{ marginLeft: '100px', marginTop: '100px' }}>
        <BuyNFT />
      </Box>

    </div>
  );
}
