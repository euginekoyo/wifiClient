import React from "react";
import { Box, Typography } from "@mui/material";
import Index3 from ".";

const Dashboard = () => {
  return (
    <Box sx={{ mx: { xs: 2, lg: 8 }, my: { xs: 3, lg: 2 } }}>
      <Box display="flex" flexDirection="row" alignItems="center" sx={{ mx: { lg: 1, xs: 2 } }}>
        <Typography
          sx={{
            fontSize: { xs: '1.6rem', lg: '2.8rem' },
            fontWeight: 'bold',
            fontFamily: 'Roboto, sans-serif',
            color: 'text.primary',
            mx: { xs: 1 },
          }}
        >
          Welcome to Smart Connect
        </Typography>
        <Box sx={{ fontSize: { lg: 32, xs: 28 }, color: '#3B82F6' }}>🤩</Box>
      </Box>
      <Index3 />
    </Box>
  );
};

export default Dashboard;
