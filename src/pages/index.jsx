import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Ads from "./components/papersAds";
import Packages from "./components/packages";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Fade, Slide } from "@mui/material";

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
    <>
      <Fade in timeout={1000}>
        <Card sx={{ marginBottom: 5, borderRadius: 5, boxShadow: 8 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/src/assets/wifi2.jpg"
              alt="SmartWIFI"
              sx={{}}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                mt={-8}
                ml={{ xs: -1, lg: -1 }}
                component="div"
              >
                SmartWIFI
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Fade>

      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Stack
            spacing={{ xs: 1, sm: 2, md: 4 }}
            direction={{ xs: "column", sm: "row" }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Slide direction="left" in timeout={1500}>
              <Item sx={{ borderRadius: 5, boxShadow: 8 }}>
                <Ads />
              </Item>
            </Slide>

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
