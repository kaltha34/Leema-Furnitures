import { createTheme } from '@mui/material/styles';

// Custom theme for Leema Furniture
// Using warm wood tones and modern furniture colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B5A2B', // Warm wood brown
      light: '#A67C52',
      dark: '#6B4423',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4A6741', // Forest green
      light: '#6A8761',
      dark: '#344D2F',
      contrastText: '#fff',
    },
    background: {
      default: '#F8F5F0', // Warm off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#FFA000',
    },
    info: {
      main: '#1976D2',
    },
    success: {
      main: '#388E3C',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          padding: '12px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
        sizeLarge: {
          fontSize: '1.3rem',
          padding: '16px 32px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            fontSize: '1.2rem',
            padding: '12px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
          borderRadius: 16,
        },
      },
    },
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          transform: 'scale(1.5)',
        },
      },
    },
  },
});

export default theme;
