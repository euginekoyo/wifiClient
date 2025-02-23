import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, Stack, TextField } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from "@mui/material/Modal";
import { Icon, SendHorizonalIcon } from "lucide-react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  marginTop: 12,
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const API_URL = import.meta.env.VITE_SERVER_URL;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "20px",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Packages() {
  const [packages, setPackages] = React.useState([]);
  const [packageId, setPackageId] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    try {
      const response = axios.post(`${API_URL}/getPackageId/${id}`);
      setPackageId(response.data);
    } catch (error) {
      console.error(error);
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
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
  const handleChange = (e) => {
    setPhone(e.target.value);
  };
  return (
    <Box sx={{ mx: { xs: 1 }, width: "100%", borderRadius: 20 }}>
      <Grid
        container
        sx={{ width: "100%" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid size={6} sx={{ width: "100%" }}>
          <Item variant="h3" sx={{ mx: { xs: 4 }, borderRadius: 8 }}>
            Packeges
          </Item>
        </Grid>
        <Grid sx={{ mx: { lg: 10 } }}>
          {packages.map((pkgs) => (
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileInView={{ opacity: 1 }}
            >
              <Item sx={{ borderRadius: 2, boxShadow: 5 }} key={pkgs.id}>
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
                      mr: { lg: 2, xs: 1 },
                      my: 2,
                      borderRadius: { lg: 2, xs: 1 },
                      width: { lg: 100 },
                      boxShadow: 10,
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: -3 } }}>
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
                    <Box display={"flex"} flexDirection={"row"}>
                      <Typography
                        variant="subtitle2"
                        sx={{ whiteSpace: "normal", width: { lg: 100 } }}
                        mt={1}
                      >
                        {pkgs.time}
                      </Typography>
                      <Typography variant="subtitle2" mt={1}>
                        {pkgs.description}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" mt={1}>
                      @ {pkgs.price}
                    </Typography>
                  </Stack>
                  <IconButton
                    onClick={() => handleOpen(pkgs.id)}
                    sx={{
                      fontSize: { lg: 18, xs: 14 },
                      ml: "auto",
                      borderRadius: 3,
                      my: 2,
                      width: { lg: 80, xs: 60 },
                      height: 40,
                      bgcolor: "#6E473B",
                    }}
                  >
                    Buy
                  </IconButton>

                  {/*Mpesa modal */}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        mb={2}
                        component="h2"
                      >
                        Enter phone to pay {pkgs.price}
                      </Typography>
                      <TextField
                        name="phone"
                        value={phone}
                        label="Phone(+254xxxxxxxxx)"
                        size="small"
                        onChange={handleChange}
                        fullWidth
                      />
                      <IconButton
                        sx={{
                          mx: { lg: 16, xs: 7 },
                          mt: { lg: 4, xs: 4 },
                          borderRadius: 3,
                          width: { lg: 100, xs: 200 },
                          bgcolor: "#6E473B",
                        }}
                      >
                        <Stack direction={"row"} spacing={1}>
                          <span style={{fontSize:"1.2rem"}}>Pay</span>
                          <SendHorizonalIcon />
                        </Stack>
                      </IconButton>
                    </Box>
                  </Modal>
                </Stack>
              </Item>
            </motion.div>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
