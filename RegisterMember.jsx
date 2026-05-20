import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  Snackbar,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import { addMember } from '../api/memberApi';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';

const RegisterMember = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (member) => {
    try {
      await addMember(member);
      setSnackbar({
        open: true,
        message: 'Member registered successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error registering member:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to register member. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <HomeIcon fontSize="small" />
            Dashboard
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PersonAddIcon fontSize="small" />
            Register Member
          </Typography>
        </Breadcrumbs>

        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <PersonAddIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, color: '#1a202c' }}
          >
            Register New Member
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: '#4a5568', fontWeight: 300 }}
          >
            Add a new member to your gym with complete information
          </Typography>
        </Box>

        {/* Form */}
        <MemberForm onSubmit={handleSubmit} />

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default RegisterMember;
