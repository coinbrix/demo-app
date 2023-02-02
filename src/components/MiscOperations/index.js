import { Box, Button } from '@mui/material';

export default function MiscOperations() {
  const getUserDetails = async () => {
    try {
      const user = await window.SingularityEvent.getConnectUserInfo();
      window.alert(JSON.stringify(user.metaData));
    } catch (err) {
      console.error(err);
      window.alert('Some error occured');
    }
  };

  const openDrawer = async () => {
    try {
      await window.SingularityEvent.open();
    } catch (err) {
      console.error(err);
      window.alert('Some error occured');
    }
  };

  const logout = async () => {
    try {
      await window.SingularityEvent.logout();
    } catch (err) {
      console.error(err);
      window.alert('Some error occured');
    }
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
        gap: 3,
        justifyContent: 'center',
      }}
    >
      <Button
        sx={{
          fontSize: 20,
          lineHeight: '23px',
        }}
        variant="contained"
        onClick={getUserDetails}
      >
        Get user details
      </Button>

      <Button
        sx={{
          fontSize: 20,
          lineHeight: '23px',
        }}
        variant="contained"
        onClick={openDrawer}
      >
        Open Drawer
      </Button>

      <Button
        sx={{
          fontSize: 20,
          lineHeight: '23px',
        }}
        variant="contained"
        onClick={logout}
      >
        Sign out
      </Button>
    </Box>
  );
}
