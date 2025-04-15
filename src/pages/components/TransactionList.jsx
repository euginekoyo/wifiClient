import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Receipt, 
  Clock, 
  UserCircle, 
  Package, 
  DollarSign 
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'processing':
        return '#60A5FA';
      case 'requires_action':
        return '#8B5CF6';
      case 'requires_payment_method':
        return '#F43F5E';
      case 'canceled':
        return '#6B7280';
      case 'failed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusMessage = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'Payment completed successfully';
      case 'pending':
        return 'Payment is pending processing';
      case 'processing':
        return 'Payment is being processed';
      case 'requires_action':
        return 'Additional verification needed';
      case 'requires_payment_method':
        return 'New payment method needed';
      case 'canceled':
        return 'Payment was canceled';
      case 'failed':
        return 'Payment failed';
      default:
        return 'Unknown status';
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/admin/transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 4, borderRadius: 6, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={4}>
          <Receipt size={28} color="#3B82F6" />
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Transaction History
          </Typography>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography fontWeight="bold">ID</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">User</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Package</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Amount (KES)</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Amount (USD)</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Date</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow key={transaction.id} hover>
                    <TableCell>{transaction.payment_intent_id?.slice(-6)}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <UserCircle size={20} color="#6B7280" />
                        <Typography variant="body2" color="text.secondary">
                          {transaction.user_id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Package size={20} color="#6B7280" />
                        <Typography variant="body2" color="text.secondary">
                          {transaction.package_id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        KES {transaction.amount_kes.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        ${transaction.amount_usd.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={getStatusMessage(transaction.status)}>
                        <Chip
                          label={transaction.status}
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor(transaction.status)}15`,
                            color: getStatusColor(transaction.status),
                            fontWeight: 600,
                          }}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Clock size={16} color="#6B7280" />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(transaction.created_at).toLocaleString()}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sx={{ mt: 2 }}
        />
      </Paper>
    </motion.div>
  );
};

export default TransactionList;
