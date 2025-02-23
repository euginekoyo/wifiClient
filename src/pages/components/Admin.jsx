import TextField from "@mui/material/TextField";
import React from "react";
import Box from "@mui/material/Box";
import { IconButton, Paper, Typography } from "@mui/material";
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
    <motion.div whileHover={{ scale: 1.3 }}>
      <Box
        mb={4}
        component={"form"}
        onSubmit={handleSubmit}
        mt={4}
        sx={{
          height: 400,
          mx: { xs: 2 },
          width: { lg: 400, xs: 350 },
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
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
          sx={{ marginTop: { xs: 2, lg: 2 }, width: { lg: 250, xs: 260 } }}
          label=" Ative time"
          onChange={handleChange}
          size="small"
          name="time"
        />
        <TextField
          fullWidth
          sx={{ marginTop: { xs: 2, lg: 2 }, width: { lg: 250, xs: 260 } }}
          label=" Description"
          onChange={handleChange}
          size="small"
          name="description"
        />
        <TextField
          fullWidth
          sx={{
            marginTop: { xs: 2, lg: 2 },
            mx: 2,
            width: { lg: 250, xs: 260 },
          }}
          size="small"
          onChange={handleChange}
          label="price"
          name="price"
        />
        <Box>
          <TextField
            fullWidth
            sx={{
              marginTop: { xs: 2, lg: 2 },

              width: { lg: 250, xs: 260 },
            }}
            size="small"
            onChange={handleChange}
            label=" status"
            name="status"
          />
        </Box>
        <IconButton
          size="small"
          type="submit"
          sx={{
            mt: 4,
            mx: { lg: 10 },
            backgroundColor: "#6E473B",
            borderRadius: 2,
            width: { lg: 200, xs: 150 },
          }}
        >
          <motion.div whileHover={{ scale: 1.1, rotate: -2 }}>
            <span style={{ marginRight: 5, my: 4 }}>Add</span>
            <SendHorizontalIcon style={{ marginTop: 5 }} />
          </motion.div>
        </IconButton>
      </Box>
    </motion.div>
  );
}

export default Admin;
