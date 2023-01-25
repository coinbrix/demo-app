import { Box, Button, Typography } from '@mui/material';

import bgImg from '../../assets/marketplace-bg.png';
import Navbar from '../Navbar';
import NFTCard from '../NFTCard';

export default function NFTMarketplace() {
  const requestPersonalSignature = async () => {
    try {
      const msg = window.prompt('Enter message');

      if (msg) {
        const signature =
          await window.SingularityEvent.requestPersonalSignature(msg);

        if (signature.metaData)
          window.alert('Signature: ' + signature.metaData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const data = {
    nftResponse:
      '{"ownedNfts":[{"contract":{"address":"0x397a7f59cc8e47854df20116ff0c0aa370371c49"},"id":{"tokenId":"0x0000000000000000000000000000000000000000000000000000000000016489","tokenMetadata":{"tokenType":"ERC721"}},"balance":"1","title":"Blockvatar #91273","description":"This is a common Blockvatar. Although common, every Blockvatar is unique and there will never be two of the same!","tokenUri":{"raw":"https://api.blockvatar.com/v1/blockvatars/91273","gateway":"https://api.blockvatar.com/v1/blockvatars/91273"},"media":[{"raw":"ipfs://bafkreifvjazoizyeb7vcontmbjctnzziviy4xtws4dokmz5hxbwxjpu3fu","gateway":"https://nft-cdn.alchemy.com/matic-mainnet/a7abb3a40db45bb8f3d6a226ece9506c","thumbnail":"https://res.cloudinary.com/alchemyapi/image/upload/thumbnail/matic-mainnet/a7abb3a40db45bb8f3d6a226ece9506c","format":"png","bytes":78778}],"metadata":{"name":"Blockvatar #91273","description":"This is a common Blockvatar. Although common, every Blockvatar is unique and there will never be two of the same!","image":"ipfs://bafkreifvjazoizyeb7vcontmbjctnzziviy4xtws4dokmz5hxbwxjpu3fu","external_url":"https://blockvatar.com/blockvatars/91273","attributes":[{"value":"Common","trait_type":"Type"},{"value":"Seagull","trait_type":"Background Color"},{"value":"Verdigris","trait_type":"Body Color"},{"value":"Sweating","trait_type":"Head"},{"value":"Fake Smile","trait_type":"Eyes"},{"value":"Ticking Lips","trait_type":"Mouth"},{"value":"Loose Denim Overall","trait_type":"Outfit"},{"value":"Axe on Head","trait_type":"Item"}]},"timeLastUpdated":"2022-12-20T18:53:59.785Z","contractMetadata":{"name":"Blockvatar","symbol":"BVTR","tokenType":"ERC721","contractDeployer":"0x1aec1f531a0b11819b83bfa8b063042a90cfee06","deployedBlockNumber":25203491,"openSea":{"lastIngestedAt":"2023-01-21T14:40:01.000Z"}}}],"totalCount":1,"blockHash":"0x5663c5de8a3d98efd99e023a2281754d64c304f76947960ad142e42459ab4c45"}',
    status: 'SUCCESS',
    error: null,
  };

  const NFTs = JSON.parse(data.nftResponse).ownedNfts;

  console.log(NFTs);

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

      <Typography sx={{ pt: 5, textAlign: 'center', color: 'primary.main' }}>
        NFT MARKETPLACE
      </Typography>

      <Button onClick={requestPersonalSignature}>
        Request Personal Signature
      </Button>

      <Box
        display="grid"
        gridTemplateColumns={{ md: 'repeat(2, 410px)' }}
        justifyContent="space-between"
        py={4}
        mx={10}
        rowGap={5}
      >
        <NFTCard nft={NFTs[0]} />
        <NFTCard nft={NFTs[0]} />
        <NFTCard nft={NFTs[0]} />
        <NFTCard nft={NFTs[0]} />
      </Box>
    </div>
  );
}
