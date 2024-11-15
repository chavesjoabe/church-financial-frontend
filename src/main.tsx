import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f1f2b',
    },
    secondary: {
      main: '#627a90',
    },
    success: {
      main: '#3c3c97',
    },
    warning: {
      main: '#a58e79',
    },
    error: {
      main: '#640141',
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
