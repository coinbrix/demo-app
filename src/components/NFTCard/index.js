import { Box, Button, Divider, Typography } from '@mui/material';

export default function NFTCard() {
  return (
    <Box
      sx={{
        border: '6px solid',
        borderColor: 'primary.main',
        bgcolor: '#EBA82699',
        maxWidth: 410,
      }}
    >
      <p>TODO: Image</p>

      <Box color="white">
        <Box display="flex" justifyContent="space-between" mb={1.5} mx={4}>
          <Typography fontSize={18}>SMG - Micro Uzi</Typography>
          <Typography fontSize={18}>12 MATIC</Typography>
        </Box>

        <Typography fontSize={14} mx={4}>
          Its high rate of fire makes it great room cleaner but magazine is
          empty quick and on longer ranges{' '}
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
