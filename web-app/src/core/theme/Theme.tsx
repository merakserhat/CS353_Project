import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2f3032',
      contrastText: '#e4e6eb',
    },
    secondary: {
      main: '#0A2947',
    },
    background: {
      default: '#18191a',
    },
    error: {
      main: "#F0304E",
    },
    text: {
      primary: '#e4e6eb',
    },
    info: {
      main: "#E4E6EB"
    }
  },
  typography: {
    h6: {
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: "1.2rem"

    },
    h4: {
      fontWeight: "bold"
    },
    subtitle2: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
      fontSize: 18,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', 
          },
        },
      },
    },
  },
});

export default themeOptions;