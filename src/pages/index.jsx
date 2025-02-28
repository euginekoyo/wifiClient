import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Ads from "./components/papersAds";
import Packages from "./components/packages";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Slide } from "@mui/material";
import Carousel from "./components/Carousel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",

  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#2A202B",
  }),
  ...theme.applyStyles("light", {
    background: "linear-gradient(to right, #0A0A0B, #E0EBF1)",
  }),
}));

export default function Index3() {
  return (
    <>
      <div>
        <Carousel />
      </div>

      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Stack
            spacing={{ xs: 1, sm: 2, md: 4, lg: 4 }}
            direction={{ xs: "column", sm: "row" }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box sx={{mx:{lg:6 , xs:2},width: "100%"}}>
              <Slide direction="left" in timeout={1500}>
                <Item sx={{ borderRadius: 5, boxShadow: 8 }}>
                  <Ads />
                </Item>
              </Slide>
            </Box>

            <Slide direction="right" in timeout={1500}>
              <Item sx={{ borderRadius: 5, boxShadow: 8 }}>
                <Packages />
              </Item>
            </Slide>
          </Stack>
        </Grid>
      </Box>
    </>
  );
}
