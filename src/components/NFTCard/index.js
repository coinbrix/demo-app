import { Box, Button, Divider, Typography } from '@mui/material';

export default function NFTCard({ nft }) {
  console.log('nft inside', nft);
  const {
    balance,
    contractMetadata: { symbol },
    description,
    media,
    title,
  } = nft;

  const image = media[0].thumbnail;

  return (
    <Box
      sx={{
        border: '6px solid',
        borderColor: 'primary.main',
        bgcolor: '#EBA82699',
        maxWidth: 410,
      }}
    >
      <Box textAlign="center" my={2}>
        <img src={image} alt="" width="50%" />
      </Box>

      <Box color="white">
        <Box display="flex" justifyContent="space-between" mb={1.5} mx={4}>
          <Typography fontSize={18}>{title}</Typography>
          <Typography fontSize={18}>
            {balance} {symbol}
          </Typography>
        </Box>

        <Typography fontSize={14} mx={4}>
          {description}
        </Typography>

        <Divider sx={{ height: 4, bgcolor: 'primary.main', my: 1.5, mx: 1 }} />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Button
            sx={{
              fontSize: 16,
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
              fontSize: 16,
              lineHeight: '18px',
              px: 7,
              whiteSpace: 'nowrap',
            }}
            variant="contained"
          >
            buy now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
