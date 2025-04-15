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
import { Activity, Clock, UserCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ActionTracker = () => {
  const [actions, setActions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const getActionColor = (action) => {
    switch (action) {
      case 'package_view':
        return '#10B981';
      case 'login':
        return '#6366F1';
      default:
        return '#F59E0B';
    }
  };

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/actions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActions(response.data);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };
    fetchActions();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 4, borderRadius: 6, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={4}>
          <Activity size={28} color="#3B82F6" />
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            User Activity Tracker
          </Typography>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography fontWeight="bold">User</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Action</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Data</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Timestamp</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((action, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <UserCircle size={20} color="#6B7280" />
                        <Typography variant="body2" color="text.secondary">
                          {action.user_id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={action.action}
                        size="small"
                        sx={{
                          bgcolor: `${getActionColor(action.action)}15`,
                          color: getActionColor(action.action),
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {action.data}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Clock size={16} color="#6B7280" />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(action.timestamps).toLocaleString()}
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
          count={actions.length}
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

export default ActionTracker;
