import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Ads from "./components/papersAds";
import Packages from "./components/packages";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
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

export default function Index3() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Stack
          spacing={{ xs: 1, sm: 2, md: 4 }}
          direction={{ xs: "column", sm: "row" }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Item>
            <Ads />
          </Item>

          <Item>
            <Packages />
          </Item>
        </Stack>
      </Grid>
    </Box>
  );
}
