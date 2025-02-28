import React from "react";
import { Box, Typography } from "@mui/material";
import Index3 from ".";
const Dashboard = () => {
  return (
    <Box sx={{ mx: { xs: 2, lg: 8 }, my: { xs: 2, lg: 1 } }}>
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"} sx={{mx:{lg:1 , xs:2} }}>
        <Typography
          sx={{
            fontSize: { xs: "1.4rem" ,lg:"2.5rem"},
            fontWeight: "bold",
            fontFamily: "monospace",
            mx: { xs: 1 },
          }}
        >
          Welcome to Smart Connect
        </Typography>
        <Box fontSize={30}>🤩</Box>
        
      </Box>
      <Index3 />
    </Box>
  );
};

export default Dashboard;
