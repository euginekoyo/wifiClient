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
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
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
          <Item>
            <Card sx={{ borderRadius: 5 }}>
              <CardActionArea>
                <CardContent>
                  <Stack direction={"row"}>
                    <Avatar sx={{ mr: { lg: 1, xs: 3 }, borderRadius: 2 }}>
                      250
                    </Avatar>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{ml:{lg:-6,xs:-8}}}
                    >
                      Welcome Free 250 mbs
                      <IconButton
                        sx={{
                          ml: { xs: 28, lg: 30 },
                          mt: -5,
                          backgroundColor: "green",
                          borderRadius: 1,
                        }}
                      ></IconButton>
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontSize: { xs: 12 }, mt: { lg: -3 } }}>
                    Valid till 20:20 19/2/2025
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 12 }, mt: { lg: 1 } }}>
                    Total Usage (200 Mbs)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
