import * as React from "react";
import {
  Box,
  Button,
  Modal,
  Backdrop,
  Typography,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { LogIn, Shield, User, PhoneCall } from "lucide-react";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  zIndex: 1300,
};

export default function OTPModal() {
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_SERVER_URL;

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token validity and redirect if valid
      checkAuthStatus(token);
    }
  }, []);

  const checkAuthStatus = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Headers Sent:", response.config.headers);  
      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/layout/dashboard");
      }
    } catch (error) {
      // Token invalid or expired, clear it
      localStorage.removeItem("token");
    }
  };

  const handleModalClose = () => {
    setOpenOtpModal(false);
    setOpenLoginModal(false);
    setOtpSent(false);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/login`, { phone });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        // Redirect based on role
        if (response.data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/layout/dashboard");
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${API_URL}/otp/send`, { phone });
      setOtpSent(true);
      setOpenOtpModal(true);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/otp/verify`, {
        phone,
        otp_code: otpCode,
        role, // Send the selected role
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        handleModalClose();

        // Redirect based on role
        if (response.data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/layout/dashboard");
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSendOtp}
        sx={{
          borderRadius: 5,
          width: { lg: 400, xs: 350 },
          mx: { lg: 60, md: 40, xs: 2 },
          px: 5,
          py: 4,
          boxShadow: 3,
        }}
      >
        <Typography
          my={4}
          sx={{ fontSize: { lg: "0.95rem", xs: "0.85rem" } }}
          textAlign="center"
        >
          Already have an account?
          <IconButton
            sx={{ borderRadius: 4, mx: { lg: 2 } }}
            onClick={() => setOpenLoginModal(true)}
          >
            <Link style={{ fontSize: "1em" }}>Login</Link> <LogIn />
          </IconButton>
        </Typography>

        <TextField
          label="Phone"
          fullWidth
          size="small"
          value={phone}
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PhoneCall style={{ color: "#3F8B42" }} strokeWidth={2.75} />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setPhone(e.target.value)}
          disabled={otpSent}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth size="small" disabled={otpSent}>
          <InputLabel>Account Type</InputLabel>
          <Select
            value={role}
            label="Account Type"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="user">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <User size={16} style={{ marginRight: 8 }} />
                User
              </Box>
            </MenuItem>
            <MenuItem value="admin">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <User size={16} style={{ marginRight: 8 }} />
                admin
              </Box>
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          disabled={otpSent}
          sx={{
            mt: 4,
            borderRadius: 10,
            width: "100%",
            bgcolor: otpSent ? "grey.400" : "primary.main",
            color: "white",
          }}
        >
          {otpSent ? "OTP Sent" : "Send OTP"}
        </Button>
      </Box>

      {/* OTP Modal */}
      <Modal
        open={openOtpModal}
        onClose={handleModalClose}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={modalStyle}>
            <Typography variant="h6" my={2} textAlign="center">
              Enter The OTP sent to {phone}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              size="small"
              label="OTP"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              sx={{ mt: 2 }}
            />

            <Typography variant="body2" sx={{ mt: 2 }}>
              Registering as:{" "}
              <strong>
                {role === "admin" ? "Administrator" : "Regular User"}
              </strong>
            </Typography>

            <Button
              onClick={handleVerifyOtp}
              sx={{
                mt: 4,
                borderRadius: 10,
                width: "100%",
                bgcolor: "success.main",
                color: "white",
              }}
            >
              Verify OTP
            </Button>
          </Box>
        </motion.div>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={openLoginModal}
        onClose={handleModalClose}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box component="form" onSubmit={handleLogin} sx={modalStyle}>
            <Typography variant="h6" my={2} textAlign="center">
              Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              size="small"
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mt: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneCall
                      style={{ color: "#3F8B42  " }}
                      strokeWidth={2.75}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              sx={{
                mt: 4,
                borderRadius: 10,
                width: "100%",
                bgcolor: "wheat",
                color: "black",
              }}
            >
              <Typography sx={{ mr: 1 }}>Login</Typography> <LogIn size={18} />
            </Button>
          </Box>
        </motion.div>
      </Modal>
    </div>
  );
}
