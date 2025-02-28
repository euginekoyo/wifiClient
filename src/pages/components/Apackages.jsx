import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, Stack } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",

  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  ...theme.applyStyles("light", {
    backgroundColor: "#1A2027",
    color: "white",
  }),
}));

export default function Packages() {
  const [packages, setPackages] = React.useState([]);
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const getPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/packages`);
      // console.table(response.data);
      setPackages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getPackages();
  }, []);

  return (
    <Box sx={{ mx: { xs: 1 }, width: "100%", borderRadius: 20 }}>
      <Grid
        container
        sx={{ width: "100%" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid size={6} sx={{ width: "100%" }}>
          <Item variant="h3" sx={{ mx: { xs: 4 }, borderRadius: 2 }}>
            Packeges
          </Item>
        </Grid>
        <Grid>
          {packages.map((pkgs) => (
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileInView={{ opacity: 1 }}
            >
              <Item
                sx={{
                  borderRadius: 2,
                  boxShadow: 5,
                  my: { lg: 1.5, xs: 1.5 },
                  width: { lg: 430 },
                  height: { lg: 80 },
                }}
                key={pkgs.id}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    width: { lg: 400, xs: 290 },
                    mx: { xs: 2 },
                    alignItems: "flex-start ",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    sx={{
                      ml: { lg: -2, xs: -2 },
                      mr: { lg: 2, xs: 1 },
                      my: 2,
                      borderRadius: { lg: 2, xs: 1 },
                      width: { lg: 100, xs: 70 },
                      height: { lg: 50, xs: 50 },
                      boxShadow: 10,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: -3 }, my: 2, color: "black" }}
                    >
                      {pkgs.price}
                    </Typography>
                  </Avatar>
                  <Stack
                    direction={"column"}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      sx={{
                        whiteSpace: "normal",
                        ml: { lg: 6 },
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ ml: { lg: -4 } }}
                        mt={2}
                      >
                        {pkgs.time}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "1.5rem", sm: "0.75rem" }, // Responsive font size
                          textWrap: "wrap", // Ensures text wraps
                          whiteSpace: "normal", // Allows normal text wrapping
                          wordBreak: "break-word", // Breaks long words if needed
                          ml: 2,
                          mt: 2.5,
                        }}
                      >
                        {pkgs.description}
                      </Typography>
                    </Stack>
                  </Stack>

                  <IconButton
                    sx={{
                      fontSize: { lg: 18, xs: 16 },
                      ml: "auto",
                      borderRadius: 3,
                      height: 50,
                      my: 2,
                      color: "white",
                      width: { lg: 80, xs: 50 },
                      background: "#2676C6",
                    }}
                  >
                    Buy
                  </IconButton>
                </Stack>
              </Item>
            </motion.div>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
