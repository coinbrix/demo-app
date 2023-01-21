import { createTheme } from '@mui/material/styles';

let theme = createTheme();
theme = createTheme(theme, {
  palette: {
    primary: {
      main: '#F9AB16',
      contrastText: '#030303',
    },
    action: {
      disabled: '#A6A6A6',
      disabledBackground: '#E4E4E4',
    },
  },
  typography: {
    body1: {
      fontSize: 24,
    },
    button: {
      fontSize: 20,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        },
      },
    },
  },
});

export default theme;
