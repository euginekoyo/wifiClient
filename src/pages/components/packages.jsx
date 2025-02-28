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
import { SendHorizontalIcon } from "lucide-react";
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
const API_URL = import.meta.env.VITE_SERVER_URL;
const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 500, xs: 350 },
  bgcolor: "#000000",

  color: "#000000",
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
              key={pkgs.id}
            >
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
                      mr: { lg: 2, xs: 1 },
                      my: 2,
                      borderRadius: { lg: 2, xs: 1 },
                      width: { lg: 100, xs: 70 },
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
                    <Box display={"flex"} flexDirection={"row"} my={2}>
                      <Typography
                        variant="subtitle1"
                        sx={{ whiteSpace: "normal", width: { lg: 100 } }}
                        mt={1}
                        mx={1}
                      >
                        {pkgs.time}
                      </Typography>
                      <Typography variant="subtitle1" mx={1} mt={1}>
                        {pkgs.description}
                      </Typography>
                    </Box>
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
                      bgcolor: "#0EA73C",
                      color: "white",
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
                        sx={{mx:{lg:10}}}
                        component="h2"
                        color="white"
                      >
                        Enter phone to pay {pkgs.price}
                      </Typography>
                      <TextField
                        name="phone"
                        value={phone}
                        label="Phone(07-xxxx-xxxx)"
                        size="small"
                        sx={{
                          mx:{
                            lg:11
                          },
                          marginTop: 2,
                          width: { lg: 250, xs: 260 },
                          "& label": { color: "white" }, // Label color
                          "& input": { color: "white" }, // Input text color
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "white" }, // Border color
                            "&:hover fieldset": { borderColor: "lightgray" }, // Border on hover
                            "&.Mui-focused fieldset": { borderColor: "white" }, // Border when focused
                          },
                        }}
                        onChange={handleChange}
                        fullWidth
                      />
                      <IconButton
                        size="small"
                        type="submit"
                        sx={{
                          mt: 4,
                          mx: { lg: 11,xs:1 },
                          background: "#2676C6",
                          borderRadius: 2,
                          width: { lg: 250, xs: 250 },
                        }}
                      >
                        <motion.div whileHover={{ scale: 1.1, rotate: -2 }}>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={2}
                          >
                            <span style={{ color: "white" }}>Pay Now</span>
                            <SendHorizontalIcon />
                          </Stack>
                        </motion.div>
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
