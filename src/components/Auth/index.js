import { Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import bgImg from '../../assets/auth-bg.png';

export default function Auth() {
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
        navigate('/home', { state: { user: user.metaData } });
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    return false;
  };

  const onDrawerToggle = () => {
    if (window.location.pathname === '/') checkLogin();
  };

  useEffect(() => {
    checkLogin();
    // setTimeout(checkLogin, 3000);

    window.SingularityEvent.subscribe('SingularityEvent-close', onDrawerToggle);
    window.SingularityEvent.subscribe('SingularityEvent-open', onDrawerToggle);
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
            py: 8,
            px: 10,
            bgcolor: 'rgba(19, 19, 20, 0.61)',
            borderRadius: 6,
            color: 'primary.main',
            fontSize: 52,
            lineHeight: 1,
          }}
        >
          demo game
        </Typography>

        <Typography mt={4} mb={8} color="white">
          IN THE CITY OF GANGSTERS YOU Lorem ipsum dolor sit amet, consectetur
          <br />
          adipiscing elit, sed do eiusmod tempor incididunt ut
        </Typography>

        <Button onClick={login} variant="contained">
          sign in to continue
        </Button>
      </Container>
    </div>
  );
}
