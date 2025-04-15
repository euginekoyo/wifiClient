import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, Area, AreaChart
} from 'recharts';
import {
  Box, Paper, Typography, Grid, MenuItem, Select
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

// Modern color palette
const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
const gradients = [
  ['#6366F1', '#818CF8'],
  ['#10B981', '#34D399'],
  ['#F59E0B', '#FBBF24'],
  ['#EF4444', '#F87171'],
  ['#8B5CF6', '#A78BFA']
];

const Analytics = () => {
  const [actionsData, setActionsData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const API_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [actionsRes, packagesRes] = await Promise.all([
          axios.get(`${API_URL}/actions`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/packages`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setActionsData(actionsRes.data);
        setPackagesData(packagesRes.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };
    fetchData();
  }, []);

  // Process activity and chart data
  const activityData = processActivityData(actionsData, timeRange);

  const packageDistribution = packagesData.map((pkg) => ({
    name: pkg.time,
    value: parseInt(pkg.price)
  }));

  const actionTypes = actionsData.reduce((acc, action) => {
    acc[action.action] = (acc[action.action] || 0) + 1;
    return acc;
  }, {});
  const actionTypeData = Object.entries(actionTypes).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={3}>
          {/* Time Range Selector */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mr: 2 }}>Time Range:</Typography>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                size="small"
                sx={{
                  minWidth: 150,
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}
              >
                <MenuItem value="day">Last 24 Hours</MenuItem>
                <MenuItem value="week">Last Week</MenuItem>
                <MenuItem value="month">Last Month</MenuItem>
              </Select>
            </Box>
          </Grid>

          {/* User Activity Area Chart */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Paper sx={cardStyle}>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  User Activity Over Time
                </Typography>
                <ResponsiveContainer>
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#6366F1"
                      fill="url(#colorCount)"
                      strokeWidth={2}
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>

          {/* Package Distribution Pie Chart */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Paper sx={cardStyle}>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Package Distribution
                </Typography>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={packageDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                      animationDuration={1500}
                      animationBegin={500}
                    >
                      {packageDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#gradient${index})`}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <defs>
                      {gradients.map(([start, end], index) => (
                        <linearGradient key={`gradient${index}`} id={`gradient${index}`}>
                          <stop offset="0%" stopColor={start} />
                          <stop offset="100%" stopColor={end} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>

          {/* Action Types Bar Chart */}
          <Grid item xs={12}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Paper sx={cardStyle}>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Action Types Distribution
                </Typography>
                <ResponsiveContainer>
                  <BarChart data={actionTypeData}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#34D399" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar
                      dataKey="value"
                      fill="url(#barGradient)"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

// Process activity by time range
const processActivityData = (data, range) => {
  const now = new Date();
  const filtered = data.filter(action => {
    const actionDate = new Date(action.timestamps);
    switch (range) {
      case 'day':
        return now - actionDate <= 24 * 60 * 60 * 1000;
      case 'week':
        return now - actionDate <= 7 * 24 * 60 * 60 * 1000;
      case 'month':
        return now - actionDate <= 30 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  });

  return filtered.reduce((acc, action) => {
    const time = new Date(action.timestamps).toLocaleString();
    const existing = acc.find(entry => entry.time === time);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ time, count: 1 });
    }
    return acc;
  }, []);
};

// Styling constants
const cardStyle = {
  p: 2,
  height: 400,
  background: 'linear-gradient(to right bottom, #ffffff, #f8faff)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
  borderRadius: 4,
  transition: '0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 32px rgba(0,0,0,0.12)'
  }
};

const tooltipStyle = {
  background: 'rgba(255,255,255,0.9)',
  border: 'none',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  fontSize: 14
};

export default Analytics;
