import TextField from "@mui/material/TextField";
import React from "react";
import Box from "@mui/material/Box";
import { IconButton, Paper, Typography } from "@mui/material";
import { SendHorizontalIcon } from "lucide-react";
function Admin() {
  const [formData, setFormData] = React.useState({
    name: "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/package",
        formData,
        {
          "Content-Type": "application/json",
        }
      );
      const data = response.json();
      console.table(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
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
          label=" name"
          onChange={handleChange}
          size="small"
          name="name"
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
            backgroundColor: "tomato",
            borderRadius: 2,
            width: { lg: 200, xs: 150 },
          }}
        >
          <span style={{ marginRight: 5 }}>Add</span>
          <SendHorizontalIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default Admin;
