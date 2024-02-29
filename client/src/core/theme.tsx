import { GlobalStyles } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#ff4c29',
    },
    secondary: {
      main: '#d87b34',
    },
    background: {
      default: '#0a1f32',
      paper: '#334756',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: 'rgba(0,0,0,0.65)',
    },
    divider: '#334756',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: '#ffffff',
          backgroundColor: 'transparent',
          WebkitBoxShadow: 'unset',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#798697',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ':disabled': {
            backgroundColor: '#7f3627',
            color: 'rgba(0,0,0,0.65)',
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);

export const globalStyles = (
  // Override -webkit-autofill styles for text input fields.
  <GlobalStyles
    styles={{
      'input:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 100px ${themeOptions.palette?.background?.paper} inset`,
        WebkitTextFillColor: themeOptions.palette?.text?.primary,
      },
      'input:-webkit-autofill:hover': {
        WebkitBoxShadow: `0 0 0 100px ${themeOptions.palette?.background?.paper} inset`,
        WebkitTextFillColor: themeOptions.palette?.text?.primary,
      },
      'input:-webkit-autofill:focus': {
        WebkitBoxShadow: `0 0 0 100px ${themeOptions.palette?.background?.paper} inset`,
        WebkitTextFillColor: themeOptions.palette?.text?.primary,
      },
    }}
  />
);
