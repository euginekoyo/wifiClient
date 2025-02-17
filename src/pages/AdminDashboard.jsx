import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Badge, IconButton, Stack, Typography } from "@mui/material";
import {
  AlignVerticalJustifyEnd,
  DollarSign,
  Grid2X2Check,
  PackageOpen,
  Dot,
  PersonStanding,
} from "lucide-react";
import Admin from "./components/Admin";
import Packages from "./components/Apackages";
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
  return (
    <>
      <Box mt={4} sx={{ mx: { lg: 16, xs: 4 }, borderRadius: 20 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, md: 2, lg: 4 }}>
          <Stack
            direction={{ lg: "row", xs: "row" }}
            spacing={{ lg: 6, xs: 2 }}
          >
            <Grid>
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
                    bgcolor: "gray",
                    borderRadius: 2,
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
                  sx={{ fontFamily: "cursive", fontSize: { xs: 14, lg: 20 } }}
                >
                  1000
                </Typography>
              </Item>
            </Grid>
            <Grid>
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
                    bgcolor: "purple",
                    borderRadius: 2,
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
                  packages
                </Typography>
                <Typography
                  variant="h6"
                  ml={3}
                  sx={{ fontFamily: "cursive", fontSize: { xs: 14, lg: 20 } }}
                >
                  30
                </Typography>
              </Item>
            </Grid>
          </Stack>
          <Stack
            direction={{ lg: "row", xs: "row" }}
            spacing={{ lg: 6, xs: 2 }}
            my={2}
          >
            <Grid>
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
                    bgcolor: "tomato",
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
                  sx={{ fontFamily: "cursive", fontSize: { xs: 14, lg: 20 } }}
                >
                  200
                </Typography>
              </Item>
            </Grid>
            <Grid>
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
                    bgcolor: "black",
                    borderRadius: 2,
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
                  sx={{ fontFamily: "cursive", fontSize: { xs: 14, lg: 20 } }}
                >
                  <Paper
                    sx={{
                      width: { lg: 200 },
                      ml: { lg: 10 },
                      bgcolor: "tomato",
                      borderRadius: 2,
                    }}
                  >
                    Kes. 10,000
                  </Paper>
                </Typography>
              </Item>
            </Grid>
          </Stack>
        </Grid>
      </Box>
      <Stack
        sx={{
          my: 4,
          mx: { lg: 20, xs: 1 },
        }}
        direction={{ lg: "row", xs: "column" }}
        spacing={{ xs: 2, lg: 3 }}
      >
        <Box sx={{ width: { xs: 350 } }}>
          <Packages />
        </Box>
        <Box>
          <Admin />
        </Box>
      </Stack>
    </>
  );
}

export default AdminDashboard;
