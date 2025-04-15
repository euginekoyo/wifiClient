import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  InputAdornment,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress
} from "@mui/material";
import { 
  Clock, 
  FileText, 
  DollarSign, 
  AlertCircle,
  Send,
  Plus
} from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

function Admin() {
  const [formData, setFormData] = useState({
    time: "",
    description: "",
    price: "",
    status: "active",
  });
  
  const [notification, setNotification] = useState({ title: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleNotificationChange = (e) => {
    const { name, value } = e.target;
    setNotification({ ...notification, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/package`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      
      setSuccess(true);
      setFormData({
        time: "",
        description: "",
        price: "",
        status: "active",
      });
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add package");
      console.error("Error adding package:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostNotification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/admin/notifications`, notification, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      setNotification({ title: "", message: "" });
    } catch (error) {
      setError("Failed to post notification");
    } finally {
      setLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(58, 123, 213, 0.4)" },
    tap: { scale: 0.95 },
    success: { backgroundColor: "#4CAF50" }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          background: "linear-gradient(45deg, #3a7bd5, #00d2ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="white">
          Create New Package
        </Typography>
        <Plus size={18} color="white" />
      </Box>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2.5
        }}
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Paper 
              sx={{ 
                p: 1.5, 
                display: "flex", 
                alignItems: "center", 
                gap: 1,
                bgcolor: "error.light",
                color: "error.dark",
                mb: 2
              }}
            >
              <AlertCircle size={18} />
              <Typography variant="body2">{error}</Typography>
            </Paper>
          </motion.div>
        )}
        
        <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
          <TextField
            fullWidth
            label="Active Time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="e.g., 30 days"
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Clock size={18} color="#6554FF" />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>
        
        <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Package details"
            variant="outlined"
            required
            multiline
            rows={2}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FileText size={18} color="#FF7E5C" />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>
        
        <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter amount"
            variant="outlined"
            required
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={18} color="#1E90FF" />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>
        
        <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </motion.div>
        
        <Box sx={{ mt: 1 }}>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={success ? "success" : undefined}
          >
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                background: success ? "#4CAF50" : "linear-gradient(45deg, #3a7bd5, #00d2ff)",
                borderRadius: 2,
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                color: "white",
                position: "relative"
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {success ? "Package Added" : "Add Package"}
                  <Send size={18} />
                </Box>
              )}
            </Button>
          </motion.div>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Post Notification
        </Typography>
        <form onSubmit={handlePostNotification}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={notification.title}
            onChange={handleNotificationChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={notification.message}
            onChange={handleNotificationChange}
            required
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Notification"}
          </Button>
          {success && <Typography color="success.main">Notification posted!</Typography>}
        </form>
      </Box>
    </Paper>
  );
}

export default Admin;