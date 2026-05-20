import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterMember from './pages/RegisterMember';
import ViewMembers from './pages/ViewMembers';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterMember />} />
            <Route path="/members" element={<ViewMembers />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;