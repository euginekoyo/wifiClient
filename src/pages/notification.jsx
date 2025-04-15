import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Bell, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const NotificationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/notifications`);
        setNotifications(response.data);
      } catch (err) {
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <AlertCircle size={40} color="#EF4444" />
        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1000px", mx: "auto" }}>
      <HeaderSection>
        <Bell size={32} />
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body1">
            Stay updated with the latest announcements
          </Typography>
        </Box>
      </HeaderSection>

      <Stack spacing={2}>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <NotificationCard>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 1,
                  color: "primary.main",
                  fontWeight: "600"
                }}
              >
                {notification.title}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "text.secondary",
                  mb: 2 
                }}
              >
                {notification.message}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: "text.disabled",
                  display: "block" 
                }}
              >
                {new Date(notification.created_at).toLocaleString()}
              </Typography>
            </NotificationCard>
          </motion.div>
        ))}
        {notifications.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Bell size={40} color="#9CA3AF" />
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              No notifications yet
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default Notification;