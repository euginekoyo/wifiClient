import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, Stack } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Packages() {
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
          <Item sx={{ borderRadius: 2, boxShadow: 5 }}>
            <Stack
              direction={"row"}
              sx={{
                width: { lg: 400, xs: 290 },
                mx: { xs: 2 },
              }}
            >
              <Avatar
                sx={{
                  ml: { lg: -2, xs: -2 },
                  mr: 2,
                  borderRadius: { lg: 2, xs: 1 },
                  boxShadow: 10,
                }}
              >
                <Typography sx={{ fontSize: { xs: -3 } }}>250</Typography>
              </Avatar>

              <Typography variant="subtitle2" mt={1}>
                Welcome Free 250 mbs
              </Typography>
              <IconButton
                sx={{
                  fontSize: { lg: 18, xs: 16 },
                  ml: { lg: 8, xs: 4 },
                  borderRadius: 3,
                  width: { lg: 60, xs: 60 },
                  bgcolor: "tomato",
                }}
              >
                Buy
              </IconButton>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
