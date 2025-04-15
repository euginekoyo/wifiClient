import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Stack, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Users,
  Package,
  UserCheck,
  DollarSign,
  Home,
  LogOut,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Admin from "./components/Admin";
import Packages from "./components/Apackages";
import ActionTracker from './components/ActionTracker';
import Analytics from './components/Analytics';
import TransactionList from './components/TransactionList';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Custom styled components
const StatsCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  display: "flex",
  alignItems: "center",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
  },
}));

const IconWrapper = styled(Box)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  borderRadius: 12,
  width: 56,
  height: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 16,
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.06)",
}));

function AdminDashboard() {
  const [packages, setPackages] = useState([]);
  const [user, setUser] = useState([]);
  const [transactionStats, setTransactionStats] = useState({
    total_amount_kes: 0,
    today_amount: 0,
    pending_amount: 0,
    total_including_pending: 0
  });
  const API_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const fetchDashboardData = async () => {
      try {
        const [packagesRes, usersRes, dashboardRes] = await Promise.all([
          axios.get(`${API_URL}/packages`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/getUser`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/admin/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setPackages(packagesRes.data);
        setUser(usersRes.data);
        
        // Add debug logging
        console.log("Dashboard response:", dashboardRes.data);
        console.log("Transaction stats:", dashboardRes.data.transaction_stats);

        // Set transaction statistics
        const stats = dashboardRes.data.transaction_stats;
        setTransactionStats({
          total_amount_kes: parseFloat(stats.total_amount_kes) || 0,
          today_amount: parseFloat(stats.today_amount) || 0,
          pending_amount: parseFloat(stats.pending_amount) || 0,
          total_including_pending: parseFloat(stats.total_including_pending) || 0
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error.response?.data || error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout
    defaultSidebarCollapsed
      branding={{
        title: "Admin Dashboard",
        logo: <Home size={24} />,
        sx: {
          background: "linear-gradient(45deg, #3a7bd5, #00d2ff)",
          color: "#fff",
        },
      }}
    >
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {/* Welcome Banner */}
        <motion.div variants={slideIn} initial="hidden" animate="visible">
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: "linear-gradient(45deg, #3a7bd5, #00d2ff)",
              color: "white",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Welcome back, Admin
                </Typography>
                <Typography variant="body1">
                  Here's what's happening with your dashboard today
                </Typography>
              </Box>
              <TrendingUp size={48} />
            </Stack>
          </Paper>
        </motion.div>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <StatsCard>
                <IconWrapper bgcolor="rgba(101, 84, 255, 0.15)">
                  <Users size={24} color="#6554FF" />
                </IconWrapper>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Users
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {user.length}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +5% this week
                  </Typography>
                </Box>
              </StatsCard>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <StatsCard>
                <IconWrapper bgcolor="rgba(255, 126, 92, 0.15)">
                  <Package size={24} color="#FF7E5C" />
                </IconWrapper>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Packages
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {packages.length || 0}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +2 new today
                  </Typography>
                </Box>
              </StatsCard>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <StatsCard>
                <IconWrapper bgcolor="rgba(30, 203, 151, 0.15)">
                  <UserCheck size={24} color="#1ECB97" />
                </IconWrapper>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active Users
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                  {user.length}

                  </Typography>
                  <Typography variant="body2" color="success.main">
                    20% of total
                  </Typography>
                </Box>
              </StatsCard>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <StatsCard>
                <IconWrapper bgcolor="rgba(30, 144, 255, 0.15)">
                  <DollarSign size={24} color="#1E90FF" />
                </IconWrapper>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Balance (Including Pending)
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    KES {(transactionStats.total_including_pending || 0).toLocaleString()}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="success.main">
                      +KES {(transactionStats.today_amount || 0).toLocaleString()} today
                    </Typography>
                    {transactionStats.pending_amount > 0 && (
                      <Typography variant="body2" color="warning.main">
                        (KES {(transactionStats.pending_amount || 0).toLocaleString()} pending)
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </StatsCard>
            </motion.div>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Package Management
                </Typography>
                <Packages />
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Admin Settings
                </Typography>
                <Admin />
              </Paper>
            </motion.div>
          </Grid>
          
          {/* New Action Tracker Section */}
          <Grid item xs={12}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <ActionTracker />
            </motion.div>
          </Grid>

          {/* Add TransactionList before Analytics */}
          <Grid item xs={12}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <TransactionList />
            </motion.div>
          </Grid>

          {/* Add Analytics Section */}
          <Grid item xs={12}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  mt: 4
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Analytics Dashboard
                </Typography>
                <Analytics />
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default AdminDashboard;
