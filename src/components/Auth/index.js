import { Button, Container, Typography, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../assets/auth-bg.png';
import TransactionCard from '../TransactionCard';
export default function Auth() {
  const [showBuyAssetForm, toggleShowBuyAssetForm] = useState(false);
  const navigate = useNavigate();
  const login = async () => {
    try {
      const loggedIn = await checkLogin();

      if (!loggedIn) await window.SingularityEvent.open();
    } catch (err) {
      console.error(err);
    }
  };

  const checkLogin = async () => {
    try {
      console.log('checking login');
      const user = await window.SingularityEvent.getConnectUserInfo();
      console.log('user data', user);

      if (user && user.metaData) {
        navigate('/home');
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    return false;
  };

  const handleBuyAsset = () => {
    toggleShowBuyAssetForm(v => !v);
  };

  useEffect(() => {
    // Initialize Firebase
    checkLogin();
  }, []);

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
        <Typography
          variant="h1"
          sx={{
            py: [4, 8],
            px: [5, 10],
            bgcolor: 'rgba(19, 19, 20, 0.61)',
            borderRadius: 6,
            color: 'primary.main',
            fontSize: [26, 52],
            lineHeight: 1,
            marginBottom: '100px'
          }}
        >
          Singularity Demo
        </Typography>

        {/*<Typography mt={4} mb={8} color="white" fontSize={[16, 24]}>*/}
        {/*  IN THE CITY OF GANGSTERS YOU Lorem ipsum dolor sit amet, consectetur*/}
        {/*  <br />*/}
        {/*  adipiscing elit, sed do eiusmod tempor incididunt ut*/}
        {/*</Typography>*/}

        <Button onClick={login} variant="contained">
          sign in to continue
        </Button>
        <Button
          onClick={handleBuyAsset}
          variant="outlined"
          sx={{
            marginTop: '10px',
          }}
        >
          Buy Asset
        </Button>

        {showBuyAssetForm ? (
          <Container
            sx={{
              position: 'fixed',
              top: '20%',
              zIndex: 2,
              background: 'white',
              width: 'fit-content',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                right: '2%',
                top: '2%',
                cursor: 'pointer',
                padding: '10px',
                background: '#F9AA16',
                borderRadius: '100%',
                width: '10px',
                height: '10px',
                lineHeight: '10px',
              }}
              onClick={handleBuyAsset}
            >
              X
            </Box>
            <TransactionCard
              handleBuyAsset={handleBuyAsset}
              showUserAddressField
            />
          </Container>
        ) : null}
      </Container>
    </div>
  );
}
