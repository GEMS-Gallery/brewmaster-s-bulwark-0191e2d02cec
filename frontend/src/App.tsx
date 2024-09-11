import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import HomePage from './components/HomePage';
import TalentsPage from './components/TalentsPage';
import StatsPage from './components/StatsPage';
import RotationPage from './components/RotationPage';
import CooldownsPage from './components/CooldownsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796B',
    },
    secondary: {
      main: '#FFA000',
    },
    background: {
      default: '#F5F5F5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Monk Tank Guide
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/talents">Talents</Button>
          <Button color="inherit" component={Link} to="/stats">Stats</Button>
          <Button color="inherit" component={Link} to="/rotation">Rotation</Button>
          <Button color="inherit" component={Link} to="/cooldowns">Cooldowns</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/talents" element={<TalentsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/rotation" element={<RotationPage />} />
          <Route path="/cooldowns" element={<CooldownsPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
