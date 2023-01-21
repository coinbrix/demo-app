import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import bgImg from '../../assets/home-bg.png';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state?.user;

  useEffect(() => {
    if (!location.state?.user) navigate('/');
  }, [location]);

  const visitMarketplace = () => navigate('/marketplace');

  console.log('home user', user);
  if (!user?.userMetaData) return;

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        width: '100vw',
        height: '100vh',
        backgroundSize: '100% 100%',
        position: 'relative',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'fixed',
          transform: 'translate(-50%,-50%)',
          left: '50%',
          top: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        <Box
          sx={{
            px: 10,
            pt: 5,
            pb: 3,
            bgcolor: 'rgba(19, 19, 20, 0.61)',
            borderRadius: 6,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              color: 'primary.main',
              fontSize: 28,
              lineHeight: 1,
            }}
          >
            welcome to demo game
          </Typography>

          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontSize: 28,
              lineHeight: 1.5,
            }}
          >
            {user.userMetaData.email}
          </Typography>
        </Box>

        <Typography mt={4} mb={8} color="white">
          IN THE CITY OF GANGSTERS YOU Lorem ipsum dolor sit amet, consectetur
          <br />
          adipiscing elit, sed do eiusmod tempor incididunt ut
        </Typography>

        <Button disabled={1} sx={{ width: 605, mb: 3 }} variant="contained">
          play game
        </Button>

        <Button
          sx={{ width: 605 }}
          onClick={visitMarketplace}
          variant="contained"
        >
          visit nft marketplace
        </Button>
      </Container>
    </div>
  );
}
