import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  Snackbar,
  Breadcrumbs,
  Link,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { getMembers, updateMember, deleteMember } from '../api/memberApi';
import MemberForm from '../components/MemberForm';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ViewMembers = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, memberId: null, memberName: '' });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      console.log('Fetching members from API...');
      const res = await getMembers();
      console.log('API Response:', res);
      console.log('Members data:', res.data);
      setMembers(res.data);
    } catch (err) {
      console.error('Error fetching members:', err);
      console.error('Error details:', err.response);
      setSnackbar({
        open: true,
        message: `Failed to fetch members: ${err.message}`,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = async (member) => {
    try {
      await updateMember(member._id, member);
      setSnackbar({
        open: true,
        message: 'Member updated successfully!',
        severity: 'success',
      });
      fetchMembers();
      setSelectedMember(null);
    } catch (err) {
      console.error('Error updating member:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to update member. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleDeleteClick = (member) => {
    setDeleteDialog({
      open: true,
      memberId: member._id,
      memberName: member.name,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMember(deleteDialog.memberId);
      setSnackbar({
        open: true,
        message: 'Member deleted successfully!',
        severity: 'success',
      });
      fetchMembers();
    } catch (err) {
      console.error('Error deleting member:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to delete member. Please try again.',
        severity: 'error',
      });
    } finally {
      setDeleteDialog({ open: false, memberId: null, memberName: '' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getMembershipColor = (type) => {
    switch (type) {
      case 'VIP': return 'error';
      case 'Premium': return 'warning';
      case 'Basic': return 'success';
      default: return 'default';
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || member.membershipType === filterType;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
    },
    {
      field: 'membershipType',
      headerName: 'Membership',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getMembershipColor(params.value)}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'joiningDate',
      headerName: 'Joining Date',
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => setSelectedMember(params.row)}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteClick(params.row)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
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
            <PeopleIcon fontSize="small" />
            View Members
          </Typography>
        </Breadcrumbs>

        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: '#1a202c', mb: 1 }}>
              Gym Members ({filteredMembers.length})
            </Typography>
            <Typography variant="h6" sx={{ color: '#4a5568', fontWeight: 300 }}>
              Manage your gym membership database
            </Typography>
            {/* Debug info */}
            <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
              Debug: Total members: {members.length}, Filtered: {filteredMembers.length}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/register')}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
              },
            }}
          >
            Add Member
          </Button>
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 300 }}
              />
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Membership Type</InputLabel>
                <Select
                  value={filterType}
                  label="Membership Type"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <MenuItem value="All">All Types</MenuItem>
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="VIP">VIP</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {/* Data Grid */}
        <Card>
          {filteredMembers.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No members found
              </Typography>
            </Box>
          ) : (
            <Box>
              {/* Fallback Table */}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Membership</TableCell>
                    <TableCell>Joining Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member._id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={member.membershipType}
                          color={getMembershipColor(member.membershipType)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{new Date(member.joiningDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => setSelectedMember(member)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(member)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </Card>

        {/* Edit Dialog */}
        <Dialog
          open={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Edit Member</DialogTitle>
          <DialogContent>
            <MemberForm
              selectedMember={selectedMember}
              onSubmit={handleEdit}
              clearSelection={() => setSelectedMember(null)}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, memberId: null, memberName: '' })}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete member "{deleteDialog.memberName}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, memberId: null, memberName: '' })}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ViewMembers;
