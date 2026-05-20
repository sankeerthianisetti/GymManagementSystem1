import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Dashboard', path: '/', icon: <FitnessCenterIcon /> },
    { label: 'Register Member', path: '/register', icon: <PersonAddIcon /> },
    { label: 'View Members', path: '/members', icon: <PeopleIcon /> },
  ];

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <FitnessCenterIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            FitHub Manager
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                color: location.pathname === item.path ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                borderRadius: 2,
                px: 2,
                py: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                },
                display: isMobile ? 'none' : 'flex',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
