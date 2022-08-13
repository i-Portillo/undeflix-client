import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      // main: '#466174'
      main: '#EBEBEB',
      dark: '#DADADA',
      darker: '#C9C9C9',
    },
    secondary: {
      main: '#6E6E6E',
      darkish: '#2F2F2F',
      dark: '#1F1F1F',
    },
    accent: {
      // main: '#A8ED8F'
      main: '#BCFD4C',
      dark: '#A5FD0D',
    },
    error: {
      light: '#FF9122',
      main: '#FF3131',
    },
    background: {
      // default: '#1A3C58'
      default: '#1E1E1E',
      paper: '#EBEBEB',
    }
  },
})