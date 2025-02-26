import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Badge, IconButton, Stack, Typography } from "@mui/material";
import {
  AlignVerticalJustifyEnd,
  DollarSign,
  PackageOpen,
  PersonStanding,
  HouseWifi,
  LogOut
} from "lucide-react";
import Admin from "./components/Admin";
import Packages from "./components/Apackages";
import axios from "axios";
import { motion } from "framer-motion";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Navigation = [
  { kind: "header" },
  {
    segment: "admin/dashboard",
    title: "AdminDashboard",
    icon: <HouseWifi />,
    path: "/admin/dashboard",
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogOut />,
    path: "/",
  },
];

function AdminDashboard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: 8,
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const [packages, setPackages] = useState([]);
  const API_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const getPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages`);
        setPackages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPackages();
  }, []);

  return (
    <AppProvider navigation={Navigation}>
      <DashboardLayout
        branding={{ title: "Admin Dashboard", logo: <HouseWifi size={30} /> }}
      >
        <Box mt={4} sx={{ mx: { lg: 16, xs: 4 }, borderRadius: 20 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, md: 2, lg: 4 }}
          >
            <Stack
              direction={{ lg: "row", xs: "row" }}
              spacing={{ lg: 6, xs: 2 }}
            >
              {/** Users Card */}
              <Grid>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <Item
                    sx={{
                      width: { lg: 400, xs: 160 },
                      height: { lg: 100, xs: 70 },
                    }}
                  >
                    <IconButton
                      sx={{
                        ml: { lg: -40, xs: -17 },
                        mt: -3,
                        bgcolor: "#291C0E",
                        borderRadius: 2,
                        boxShadow: 10,
                        width: { lg: 150 },
                        height: { lg: 50 },
                      }}
                    >
                      <AlignVerticalJustifyEnd />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{
                        ml: { xs: 3 },
                        mt: { lg: -2, xs: -3 },
                        fontWeight: "bolder",
                        fontSize: { lg: 25 },
                      }}
                    >
                      Users
                    </Typography>
                    <Typography
                      variant="h6"
                      ml={3}
                      sx={{
                        fontFamily: "cursive",
                        fontSize: { xs: 14, lg: 20 },
                      }}
                    >
                      1000
                    </Typography>
                  </Item>
                </motion.div>
              </Grid>

              {/** Packages Card */}
              <Grid>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <Item
                    sx={{
                      width: { lg: 400, xs: 160 },
                      height: { lg: 100, xs: 70 },
                    }}
                  >
                    <IconButton
                      sx={{
                        ml: { lg: -40, xs: -17 },
                        mt: -3,
                        bgcolor: "#6E473B",
                        borderRadius: 2,
                        boxShadow: 10,
                        width: { lg: 150 },
                        height: { lg: 50 },
                      }}
                    >
                      <PackageOpen />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{
                        ml: { xs: 5 },
                        mt: { lg: -2, xs: -3 },
                        fontWeight: "bolder",
                        fontSize: { lg: 25 },
                      }}
                    >
                      Packages
                    </Typography>
                    <Typography
                      variant="h6"
                      ml={3}
                      sx={{
                        fontFamily: "cursive",
                        fontSize: { xs: 14, lg: 20 },
                      }}
                    >
                      {packages.length}
                    </Typography>
                  </Item>
                </motion.div>
              </Grid>
            </Stack>

            <Stack
              direction={{ lg: "row", xs: "row" }}
              spacing={{ lg: 6, xs: 2 }}
              my={2}
            >
              {/** Active Users Card */}
              <Grid>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <Item
                    sx={{
                      width: { lg: 400, xs: 160 },
                      height: { lg: 100, xs: 70 },
                    }}
                  >
                    <IconButton
                      sx={{
                        ml: { lg: -40, xs: -17 },
                        mt: -3,
                        width: { lg: 150 },
                        height: { lg: 50 },
                        bgcolor: "#A78D78",
                        boxShadow: 10,
                        borderRadius: 2,
                      }}
                    >
                      <PersonStanding />
                    </IconButton>

                    <Typography
                      variant="h6"
                      sx={{
                        ml: { xs: 5 },
                        mt: { lg: -2, xs: -3 },
                        fontWeight: "bolder",
                        fontSize: { lg: 25 },
                      }}
                    >
                      Active
                    </Typography>

                    <Typography
                      variant="h6"
                      ml={3}
                      sx={{
                        fontFamily: "cursive",
                        fontSize: { xs: 14, lg: 20 },
                      }}
                    >
                      200
                    </Typography>
                  </Item>
                </motion.div>
              </Grid>

              {/** Balance Card */}
              <Grid>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <Item
                    sx={{
                      width: { lg: 400, xs: 160 },
                      height: { lg: 100, xs: 70 },
                    }}
                  >
                    <IconButton
                      sx={{
                        ml: { lg: -40, xs: -17 },
                        mt: -3,
                        bgcolor: "#BEB5A9",
                        borderRadius: 2,
                        boxShadow: 10,
                        width: { lg: 150 },
                        height: { lg: 50 },
                      }}
                    >
                      <DollarSign />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{
                        ml: { xs: 3 },
                        mt: { lg: -2, xs: -3 },
                        fontWeight: "bolder",
                        fontSize: { lg: 25 },
                      }}
                    >
                      Balance
                    </Typography>
                    <Typography
                      variant="h6"
                      ml={3}
                      sx={{
                        fontFamily: "cursive",
                        fontSize: { xs: 14, lg: 20 },
                      }}
                    >
                      <Paper
                        sx={{
                          width: { lg: 200 },
                          ml: { lg: 10 },
                          bgcolor: "#6E473B",
                          borderRadius: 2,
                        }}
                      >
                        Kes. 10,000
                      </Paper>
                    </Typography>
                  </Item>
                </motion.div>
              </Grid>
            </Stack>
          </Grid>
        </Box>

        {/** Staggered Reveal for Packages and Admin */}
        <Stack
          sx={{ my: 4, mx: { lg: 20, xs: 1 } }}
          direction={{ lg: "row", xs: "column" }}
          spacing={{ xs: 2, lg: 3 }}
        >
          <Stack direction={{ lg: "row", xs: "column" }} spacing={16}>
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Box sx={{ width: { xs: 350 } }}>
                <Packages />
              </Box>
            </motion.div>
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Box>
                <Admin />
              </Box>
            </motion.div>
          </Stack>
        </Stack>
      </DashboardLayout>
    </AppProvider>
  );
}

export default AdminDashboard;
