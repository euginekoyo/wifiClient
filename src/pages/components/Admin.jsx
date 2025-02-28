import TextField from "@mui/material/TextField";
import React from "react";
import Box from "@mui/material/Box";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { SendHorizontalIcon } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
function Admin() {
  const [formData, setFormData] = React.useState({
    time: "",
    description: "",
    price: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/package`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.table(response.data);
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <Box
      mb={4}
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        height: 400,
        mx: { xs: 1 },
        width: { lg: 400, xs: 350 },
        background: "black",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          my: 2,
          backgroundColor: { xs: "black" },
          py: { lg: 1, xs: 1 },
          width: 250,
          display: "flex",
          justifyContent: "center",
          fontFamily: "cursive",
        }}
      >
        <Typography variant="subtitle" color="white">
          New package
        </Typography>
      </Paper>
      <TextField
        fullWidth
        sx={{
          marginTop: 2,
          width: { lg: 250, xs: 260 },
          "& label": { color: "white" }, // Label color
          "& input": { color: "white" }, // Input text color
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" }, // Border color
            "&:hover fieldset": { borderColor: "lightgray" }, // Border on hover
            "&.Mui-focused fieldset": { borderColor: "white" }, // Border when focused
          },
        }}
        label="Active time"
        onChange={handleChange}
        size="small"
        name="time"
      />

      <TextField
        fullWidth
        sx={{
          marginTop: 2,
          width: { lg: 250, xs: 260 },
          "& label": { color: "white" }, // Label color
          "& input": { color: "white" }, // Input text color
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" }, // Border color
            "&:hover fieldset": { borderColor: "lightgray" }, // Border on hover
            "&.Mui-focused fieldset": { borderColor: "white" }, // Border when focused
          },
        }}
        label="Description"
        onChange={handleChange}
        size="small"
        name="description"
      />
      <TextField
        fullWidth
        sx={{
          marginTop: 2,
          width: { lg: 250, xs: 260 },
          "& label": { color: "white" }, // Label color
          "& input": { color: "white" }, // Input text color
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" }, // Border color
            "&:hover fieldset": { borderColor: "lightgray" }, // Border on hover
            "&.Mui-focused fieldset": { borderColor: "white" }, // Border when focused
          },
        }}
        size="small"
        onChange={handleChange}
        label="Price"
        name="price"
      />
      <Box>
        <TextField
          fullWidth
          sx={{
            marginTop: 2,
            width: { lg: 250, xs: 260 },
            "& label": { color: "white" }, // Label color
            "& input": { color: "white" }, // Input text color
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" }, // Border color
              "&:hover fieldset": { borderColor: "lightgray" }, // Border on hover
              "&.Mui-focused fieldset": { borderColor: "white" }, // Border when focused
            },
          }}
          size="small"
          onChange={handleChange}
          label="Status"
          name="status"
        />
      </Box>
      <IconButton
        size="small"
        type="submit"
        sx={{
          mt: 4,
          background: "#2676C6",
          borderRadius: 2,
          width: { lg: 200, xs: 150 },
        }}
      >
        <motion.div whileHover={{ scale: 1.1, rotate: -2 }}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <span style={{ color: "white" }}>Add</span>
            <SendHorizontalIcon />
          </Stack>
        </motion.div>
      </IconButton>
    </Box>
  );
}

export default Admin;
