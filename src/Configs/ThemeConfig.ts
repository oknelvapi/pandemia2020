import { createMuiTheme } from '@material-ui/core/styles';

export const p2020Theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#BF360C',
      contrastText: '#F0F2EF',
    },
    secondary: {
      main: '#132a3e',
      contrastText: '#F0F2EF',
    },
  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
