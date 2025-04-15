import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Ads from "./components/papersAds";
import Packages from "./components/packages";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Slide, Container } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(to right,#3361A7, #E0EBF1)",

  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  textAlign: "center",
  borderRadius: "12px",
  // boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    // boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
  },
}));

export default function Index3() {
  return (
    <Container maxWidth="lg" sx={{ py: 4,mx:{xs:2}  }}>
     

      {/* Content Section */}
      <Grid container spacing={3} justifyContent="center">
        <Stack
          spacing={4}
          direction={{ xs: "column", md: "row" }}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ width: "100%"}}
        >
          {/* Ads Section */}
          <Box sx={{ flex: 1 }}>
            <Slide direction="left" in timeout={1200}>
              <Item>
                <Ads />
              </Item>
            </Slide>
          </Box>

          {/* Packages Section */}
          <Box sx={{ flex: 1 }}>
            <Slide direction="right" in timeout={1200}>
              <Item>
                <Packages />
              </Item>
            </Slide>
          </Box>
        </Stack>
      </Grid>
    </Container>
  );
}
