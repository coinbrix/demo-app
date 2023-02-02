import { Box, Button, Divider, Typography } from '@mui/material';

export default function NFTCard({ nft }) {
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
        width: ['100%', 410],
        boxSizing: 'border-box',
      }}
    >
      <Box textAlign="center" my={1}>
        <img src={image} alt="" height="100px" />
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
          >
            buy now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
