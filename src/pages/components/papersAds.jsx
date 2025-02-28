import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Avatar, IconButton, Stack } from "@mui/material";
import { Dot } from "lucide-react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  marginTop: 12,
  fontFamily: "monospace",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#FFFFF7",
    color: "black",
  }),
  ...theme.applyStyles("light", {
    backgroundColor: "#111111",
    color: "#ffffff",
  }),
}));

export default function Ads() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        rowSpacing={1}
        direction={"column"}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid size={6} sx={{ width: "100%" }}>
          <Item variant="h5" sx={{ borderRadius: 20 }}>
            {" "}
            Current packages
          </Item>
        </Grid>
        <Grid size={6} sx={{ width: "100%" }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardActionArea>
              <CardContent>
                <Stack direction={"row"} spacing={4}>
                  <Avatar
                    sx={{
                      mr: { lg: 2, xs: 3 },
                      borderRadius: 10,
                      width: 50,
                      height: 50,
                      color: "white",
                      bgcolor: "black",
                    }}
                  >
                    250
                  </Avatar>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    Welcome Free 250 mbs
                  </Typography>
                </Stack>
                <Typography
                  sx={{ fontSize: { xs: 12, lg: 16 }, mt: { lg: -3, xs: -3 } }}
                >
                  Valid till 20:20 19/2/2025
                </Typography>
                <Typography sx={{ fontSize: { xs: 12 } }}>
                  Total Usage{" "}
                  <Typography variant="subttitle1" color="error">
                    (200 Mbs)
                  </Typography>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
