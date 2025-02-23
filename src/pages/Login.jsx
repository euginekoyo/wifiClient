import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  zIndex: 1300,
};

export default function OTPModal() {
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [otp_code, setOtpCode] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOtpSent(false); // Reset OTP sent state when closing modal
  };

  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleOtpChange = (e) => setOtpCode(e.target.value);

  const API_URL = import.meta.env.VITE_SERVER_URL;

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/otp/verify`,
        { phone, otp_code },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        console.log("OTP verified successfully");
        alert("OTP verified successfully!");
        handleClose();
        navigate("/layout/admin/dashboard"); // Fixed leading slash
      }
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response?.data || error.message
      );
      alert("Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/otp/send`,
        { phone },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("OTP sent successfully");
      setOtpSent(true); // Prevents multiple requests
      handleOpen();
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      alert("Failed to send OTP");
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderRadius: 5,
          mx: { lg: 65, xs: 2 },
          px: 10,
          py: 10,
          boxShadow: 3,
        }}
      >
        <Box>
          <TextField
            name="phone"
            label="Phone"
            fullWidth
            size="small"
            value={phone}
            onChange={handlePhoneChange}
            disabled={otpSent} // Prevents re-entering phone after sending OTP
          />
        </Box>
        <Button
          type="submit"
          disabled={otpSent} // Disables after sending OTP
          sx={{
            marginTop: 4,
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
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <motion.div
          // variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          style={style}
        >
          <Box sx={style}>
            <Typography variant="h6" my={2} textAlign="center">
              Enter The OTP sent to {phone}
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="OTP"
              value={otp_code}
              onChange={handleOtpChange}
              sx={{ mt: 2 }}
            />
            <Button
              onClick={handleOtpSubmit}
              sx={{
                marginTop: 4,
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
    </div>
  );
}
