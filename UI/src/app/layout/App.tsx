import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Header from './Header';
import Catalog from '../../features/catalog/Catalog';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const palette = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palette,
      background: {
        default: palette === 'light' ? '#eaeaea' : '#121212',
      },
    },
  });

  function onSwitch() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onSwitch={onSwitch} darkMode={darkMode} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
