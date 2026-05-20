import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Grid,
} from '@mui/material';

const MemberForm = ({ onSubmit, selectedMember, clearSelection = () => {} }) => {
  const [member, setMember] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'Basic',
    joiningDate: '',
  });

  useEffect(() => {
    if (selectedMember) {
      setMember({
        ...selectedMember,
        joiningDate: selectedMember.joiningDate ? selectedMember.joiningDate.slice(0, 10) : '',
      });
    }
  }, [selectedMember]);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(member);
    setMember({
      name: '',
      email: '',
      phone: '',
      membershipType: 'Basic',
      joiningDate: '',
    });
    clearSelection();
  };

  const membershipTypes = [
    { value: 'Basic', label: 'Basic', color: '#4caf50' },
    { value: 'Premium', label: 'Premium', color: '#ff9800' },
    { value: 'VIP', label: 'VIP', color: '#f44336' },
  ];

  return (
    <Card elevation={3}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          {selectedMember ? 'Edit Member' : 'Register New Member'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={member.name}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={member.email}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={member.phone}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="10-digit phone number"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Membership Type"
                name="membershipType"
                value={member.membershipType}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                {membershipTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: type.color,
                        }}
                      />
                      {type.label}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Joining Date"
                name="joiningDate"
                type="date"
                value={member.joiningDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            {selectedMember && (
              <Button
                variant="outlined"
                onClick={clearSelection}
                sx={{ px: 3, py: 1.5, borderRadius: 2 }}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
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
              {selectedMember ? 'Update Member' : 'Register Member'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MemberForm;
