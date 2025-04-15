import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  IconButton,
  Chip,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { Edit, Trash, Clock, DollarSign, PlusCircle } from "lucide-react";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  width: 200,
  // display:"flex",
  // justifyContent:"center",
  // alignContent:"center",
  padding: theme.spacing(3),
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  "&:hover": {
    boxShadow: "0 2px 28px rgba(0,0,0,0.12)",
    transform: "translateY(-5px)",
  },
}));

const ActionButton = styled(IconButton)(({ color = "#2676C6" }) => ({
  borderRadius: 8,
  color: "white",
  background: color,
  padding: 8,
  boxShadow: `0 4px 14px ${color}40`,
  "&:hover": {
    background: color,
    opacity: 0.85,
  },
}));

export default function Packages() {
  const [packages, setPackages] = React.useState([]);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [currentPackage, setCurrentPackage] = React.useState(null);
  const API_URL = import.meta.env.VITE_SERVER_URL;

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const getPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    getPackages();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1200px", mx: "auto" }}>
      <Grid container spacing={6}>
        {packages.map((pkg, index) => (
          <Grid item xs={12} md={6} lg={6} key={pkg.id}>
            <Fade in={true} style={{ transitionDelay: `${index * 50}ms` }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <StyledPaper sx={{ width: { xs: 300 ,lg:250}, mx: { xs: -1 } }}>
                  <Stack spacing={2}>
                    <Chip
                      label={pkg.status}
                      size="small"
                      sx={{
                        bgcolor:
                          pkg.status === "Active" ? "#2ecc71" : "#eb4d4b",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>

                    <Typography variant="h6"  mx={2} fontWeight="600">
                      {pkg.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pkg.description}
                    </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" display={"flex"} justifyContent={"center"} spacing={3}>
                      <Avatar
                        sx={{
                          bgcolor: "rgba(38, 118, 198, 0.1)",
                          color: "#2676C6",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <DollarSign size={20} />
                      </Avatar>
                      <Typography variant="h6" fontWeight="600" color="#2676C6">
                        {pkg.price}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <ActionButton
                          onClick={() => setEditDialogOpen(true)}
                          color="#2676C6"
                        >
                          <Edit size={16} />
                        </ActionButton>
                        <ActionButton
                          onClick={() => console.log("Delete", pkg.id)}
                          color="#e74c3c"
                        >
                          <Trash size={16} />
                        </ActionButton>
                      </Stack>
                    </Stack>
                  </Stack>
                </StyledPaper>
              </motion.div>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
