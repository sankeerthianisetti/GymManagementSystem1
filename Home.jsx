import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <PersonAddIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Register New Member',
      description: 'Add new gym members with complete information and membership details',
      action: 'Register Member',
      path: '/register',
      color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#f50057' }} />,
      title: 'View All Members',
      description: 'Manage existing members, edit details, and track membership status',
      action: 'View Members',
      path: '/members',
      color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
    },
  ];


  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <FitnessCenterIcon sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to FitHub Manager
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.9,
                fontWeight: 300,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Streamline your gym membership management with our modern, intuitive platform
            </Typography>
          </Box>

        </Container>
      </Box>

      {/* Main Actions */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600, color: '#1a202c' }}
        >
          Quick Actions
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: feature.color,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => navigate(feature.path)}
              >
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600, color: '#1a202c', mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: '#4a5568', mb: 4, lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                      },
                    }}
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
