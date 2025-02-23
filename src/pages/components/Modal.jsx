import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ phone }) {
  const [open, setOpen] = React.useState(false);
  const [otp_code, setOtpCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setOtpCode(e.target.value);
  };

  const handleVerify = async () => {
    if (!otp_code) {
      alert("Please enter the OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/otp/verify`, {
        phone,
        otp_code,
      });

      console.log("OTP Verified:", response.data);
      alert("OTP Verified Successfully!");
      handleClose();
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error.message);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Enter OTP</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Enter The OTP Sent to {phone}
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={otp_code}
              label="OTP Code"
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <Button 
              onClick={handleVerify} 
              fullWidth 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
