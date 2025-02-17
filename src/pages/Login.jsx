import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import { SendHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        borderRadius: 5,
        mx: { lg: 50, xs: 2 },
        // border: ,
        px: 10,
        py: 10,

        boxShadow: 3,
      }}
    >
      <Box>
        <TextField name="phone" label="Phone" fullWidth size="small" />
      </Box>
      <IconButton
        onClick={() => navigate("/layout/dashboard")}
        sx={{ marginLeft: 4, marginTop: 4, borderRadius: 10, width: "80%" }}
      >
        <span style={{ marginRight: 10 }}>Send</span>
        <SendHorizontal />
      </IconButton>
    </Box>
  );
}

export default Login;
