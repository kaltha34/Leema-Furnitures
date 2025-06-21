import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  IconButton,
  Snackbar,
  Alert,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { getAllCustomers, deleteCustomer, exportCustomersToCSV, exportCustomersToJson, CustomerData } from '../services/localStorageService';

const AdminPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCustomers, setTotalCustomers] = useState(0);

  // Load customer data from API
  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await getAllCustomers();
      
      // Handle the new API response structure
      let customerData: CustomerData[] = [];
      
      if (response && typeof response === 'object') {
        // Check if it's the new API format with status, message, data
        if ('status' in response && 'data' in response && Array.isArray(response.data)) {
          customerData = response.data.map((customer: any) => ({
            id: customer.id,
            name: customer.name,
            phoneNumber: customer.phonenumber, // Note: API uses lowercase
            preferredContactMethod: customer.preferredcontactmethod,
            purposeOfVisit: customer.purposeofvisit,
            interestedCategories: customer.interestedcategories || [],
            deliveryLocation: customer.deliverylocation,
            branchId: customer.branchid,
            timestamp: parseInt(customer.timestamp)
          }));
        } 
        // Handle old format (Record<string, CustomerData>)
        else if (!Array.isArray(response)) {
          customerData = Object.entries(response).map(([id, customer]) => ({
            ...customer as CustomerData,
            id: id
          }));
        }
        // Handle direct array format
        else if (Array.isArray(response)) {
          customerData = response;
        }
      }
      
      setCustomers(customerData);
      setTotalCustomers(customerData.length);
      console.log('Loaded customer data:', customerData);
    } catch (error) {
      console.error('Error loading customers:', error);
      setSnackbarMessage('Failed to load customer data');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadCustomers();
  }, []);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle customer deletion
  const handleDeleteCustomer = async (id: string) => {
    try {
      setLoading(true);
      await deleteCustomer(id);
      await loadCustomers(); // Reload the data
      setSnackbarMessage('Customer deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting customer:', error);
      setSnackbarMessage('Failed to delete customer');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle export to CSV (Excel)
  const handleExportToCSV = async () => {
    try {
      setLoading(true);
      const url = await exportCustomersToCSV();
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leema-customers-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSnackbarMessage('Customer data exported to CSV successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      setSnackbarMessage('Failed to export customer data to CSV');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle export to JSON
  const handleExportToJSON = async () => {
    try {
      setLoading(true);
      const url = await exportCustomersToJson();
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leema-customers-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSnackbarMessage('Customer data exported to JSON successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error exporting to JSON:', error);
      setSnackbarMessage('Failed to export customer data to JSON');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      customer.name?.toLowerCase().includes(searchTermLower) ||
      customer.phoneNumber.toLowerCase().includes(searchTermLower) ||
      customer.purposeOfVisit.toLowerCase().includes(searchTermLower) ||
      customer.preferredContactMethod.toLowerCase().includes(searchTermLower) ||
      customer.interestedCategories.some(cat => cat.name.toLowerCase().includes(searchTermLower))
    );
  });

  // Get current page of customers
  const paginatedCustomers = filteredCustomers
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ 
      p: 4, 
      maxWidth: 1200, 
      mx: 'auto',
      background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
      minHeight: '100vh'
    }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 700, 
        color: '#343a40',
        borderBottom: '2px solid #8b5a2b',
        pb: 1,
        mb: 3
      }}>
        Leema Furniture - Customer Data Management
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Search Customers"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 300 }}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={loading ? <CircularProgress size={16} /> : <RefreshIcon />}
            onClick={loadCustomers}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={loading ? <CircularProgress size={16} /> : <FileDownloadIcon />}
            onClick={handleExportToCSV}
            disabled={loading}
            sx={{ 
              background: 'linear-gradient(45deg, #8b5a2b 30%, #a67c52 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #7b4a1b 30%, #966c42 90%)',
              }
            }}
          >
            Export to Excel (CSV)
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={loading ? <CircularProgress size={16} /> : <FileDownloadIcon />}
            onClick={handleExportToJSON}
            disabled={loading}
          >
            Export to JSON
          </Button>
        </Stack>
      </Box>

      <Paper elevation={3} sx={{ mb: 4, overflow: 'hidden', borderRadius: 2 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Customer ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Contact Method</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Purpose</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Categories</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                    <Typography variant="body2" sx={{ mt: 2 }}>Loading customer data...</Typography>
                  </TableCell>
                </TableRow>
              ) : paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {customer.id}
                    </TableCell>
                    <TableCell>{customer.name || 'N/A'}</TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>{customer.preferredContactMethod}</TableCell>
                    <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {customer.purposeOfVisit}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 200 }}>
                        {customer.interestedCategories.map((category) => (
                          <Chip 
                            key={category.id} 
                            label={category.name} 
                            size="small" 
                            sx={{ 
                              backgroundColor: '#e9ecef',
                              mb: 0.5
                            }} 
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.timestamp 
                        ? new Date(customer.timestamp).toLocaleDateString() 
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteCustomer(customer.id!)}
                        size="small"
                        disabled={loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    {searchTerm ? 'No customers match your search' : 'No customer data available'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Box sx={{ mt: 4, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #dee2e6' }}>
        <Typography variant="h6" gutterBottom>Data Analysis Summary</Typography>
        <Typography variant="body1">
          Total Customers: <strong>{totalCustomers}</strong>
        </Typography>
        {totalCustomers > 0 && (
          <>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Most Popular Category: <strong>
                {(() => {
                  const categoryCount = customers.reduce((acc, customer) => {
                    customer.interestedCategories.forEach(cat => {
                      acc[cat.name] = (acc[cat.name] || 0) + 1;
                    });
                    return acc;
                  }, {} as Record<string, number>);
                  const entries = Object.entries(categoryCount);
                  return entries.sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
                })()}
              </strong>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Most Common Purpose: <strong>
                {(() => {
                  const purposeCount = customers.reduce((acc, customer) => {
                    acc[customer.purposeOfVisit] = (acc[customer.purposeOfVisit] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);
                  const entries = Object.entries(purposeCount);
                  return entries.sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
                })()}
              </strong>
            </Typography>
          </>
        )}
      </Box>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;