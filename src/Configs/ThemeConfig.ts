import { createMuiTheme } from '@material-ui/core/styles';

export const p2020Theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#26547C',
      contrastText: '#F0F2EF',
    },
    secondary: {
      main: '#BF360C',
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
