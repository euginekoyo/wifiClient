import * as React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Modal,
  Stack,
  Paper,
  Container,
  Fade,
  Divider,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingCart, Package2, Clock, BadgeCheck, Star, Award } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import StripePaymentForm from "./StripePayment";

// Enhanced styled components for premium aesthetics
const PackageCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 4,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  background: `linear-gradient(135deg, ${theme.palette.mode === "dark" ? "#1A2234 0%, #131A29 100%" : "#FFFFFF 0%, #F8FAFC 100%"})`,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`,
  overflow: "hidden",
  position: "relative",
  "&:hover": {
    boxShadow: "0 16px 70px rgba(0, 0, 0, 0.18)",
    transform: "translateY(-8px)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 5,
    background: "linear-gradient(to right, #6366F1, #8B5CF6, #EC4899)",
  },
  width: "100%",
  maxWidth: "700px",
  margin: "0 auto",
}));

const PriceTag = styled(Avatar)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  color: "white",
  fontWeight: "bold",
  borderRadius: theme.shape.borderRadius * 8,
  boxShadow: "0 8px 20px rgba(99, 102, 241, 0.25)",
  width: 80,
  height: 80,
  fontSize: "1.1rem",
  border: "4px solid rgba(255, 255, 255, 0.1)",
}));

const BuyButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
  color: "white",
  borderRadius: theme.shape.borderRadius * 6,
  padding: theme.spacing(1.5, 4),
  fontWeight: 700,
  textTransform: "none",
  letterSpacing: "0.5px",
  fontSize: "0.95rem",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 8px 16px rgba(99, 102, 241, 0.25)",
  "&:hover": {
    background: "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)",
    boxShadow: "0 12px 24px rgba(79, 70, 229, 0.3)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "5px",
    height: "5px",
    background: "rgba(255, 255, 255, 0.5)",
    opacity: 0,
    borderRadius: "100%",
    transform: "scale(1, 1) translate(-50%)",
    transformOrigin: "50% 50%",
  },
  "&:focus:not(:active)::after": {
    animation: "ripple 1s ease-out",
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(0, 0)",
      opacity: 0.5,
    },
    "100%": {
      transform: "scale(20, 20)",
      opacity: 0,
    },
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(6),
  fontWeight: 800,
  fontSize: "2rem",
  color: theme.palette.mode === "dark" ? "#E2E8F0" : "#1E293B",
  textAlign: "center",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -16,
    left: "50%",
    transform: "translateX(-50%)",
    width: 100,
    height: 6,
    background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
    borderRadius: 8,
  },
}));

const FeatureBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor: theme.palette.mode === "dark" ? "rgba(139, 92, 246, 0.1)" : "rgba(124, 58, 237, 0.08)",
  color: theme.palette.mode === "dark" ? "#A78BFA" : "#7C3AED",
  fontSize: "0.75rem",
  fontWeight: 600,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

// Enhanced modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "80%", md: "60%" },
  maxWidth: 550,
  bgcolor: "background.paper",
  borderRadius: 6,
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  p: 4,
  border: "none",
  outline: "none",
};

// Package feature icons mapping
const packageFeatureIcons = {
  "standard": <Clock size={16} />,
  "premium": <Star size={16} />,
  "elite": <Award size={16} />,
  "basic": <BadgeCheck size={16} />
};

export default function Packages() {
  const theme = useTheme();
  const [packages, setPackages] = React.useState([]);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleClickAction = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedData = localStorage.getItem("user");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const payload = {
        action: "package_view",
        data: storedData || "anonymous",
        timestamp: new Date().toISOString()
      };

      const response = await axios.post(`${API_URL}/actions`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log("Action stored successfully:", response.data);
    } catch (error) {
      console.error("Error storing action:", error.response?.data || error);
    }
  };

  const API_URL = import.meta.env.VITE_SERVER_URL;

  const handleOpen = (pkg) => {
    setSelectedPackage(pkg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPhone("");
    setError("");
  };

  const getPackages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/packages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error.response?.data || error);
      setError("Unable to load packages. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getPackages();
  }, []);

  // Determine package type based on description or time
  const getPackageType = (pkg) => {
    const desc = pkg.description.toLowerCase();
    if (desc.includes("premium") || desc.includes("ultra")) return "premium";
    if (desc.includes("elite") || desc.includes("max")) return "elite";
    if (desc.includes("basic") || desc.includes("starter")) return "basic";
    return "standard";
  };

  // Get package features based on description
  const getPackageFeatures = (pkg) => {
    const features = ["High-speed data"];
    
    if (pkg.time.includes("week") || pkg.time.includes("month")) {
      features.push("Extended access");
    }
    
    if (parseInt(pkg.price) > 50) {
      features.push("Premium support");
    }
    
    return features;
  };

  if (loading && packages.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          flexDirection: "column",
          gap: 3
        }}
      >
        <CircularProgress sx={{ color: "primary.main" }} />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>Loading premium packages...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ 
      py: { xs: 6, md: 8 },
      px: { xs: 3, md: 4 }
    }}>
      <Box sx={{ mb: 8, textAlign: "center" }}>
        <SectionTitle variant="h3">
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            mb: 2
          }}>
            <Package2 
              size={36} 
              style={{ 
                marginRight: 16, 
                verticalAlign: "middle",
                color: theme.palette.mode === "dark" ? "#A78BFA" : "#6366F1"
              }} 
            />
            <span>Premium Data Packages</span>
          </Box>
        </SectionTitle>
        
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: 650, 
            mx: "auto", 
            color: "text.secondary",
            opacity: 0.9,
            fontSize: "1.05rem"
          }}
        >
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {packages.map((pkg, index) => {
          const packageType = getPackageType(pkg);
          const features = getPackageFeatures(pkg);
          
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <PackageCard onClick={handleClickAction}>
                <Stack 
                  direction={{ xs: "column", sm: "row" }} 
                  spacing={4} 
                  alignItems={{ xs: "center", sm: "flex-start" }}
                  justifyContent="space-between"
                >
                  <Stack 
                    direction={{ xs: "column", sm: "row" }} 
                    spacing={3} 
                    alignItems={{ xs: "center", sm: "flex-start" }}
                    sx={{ width: "100%" }}
                  >
                    <PriceTag>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="caption" sx={{ opacity: 0.8, mb: -0.5 }}>KES</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>{pkg.price}</Typography>
                      </Box>
                    </PriceTag>
                    
                    <Box sx={{ textAlign: { xs: "center", sm: "left" }, flexGrow: 1 }}>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 700, 
                        mb: 1, 
                        color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#1E293B',
                        letterSpacing: "-0.025em"
                      }}>
                        {pkg.time}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ 
                        color: theme.palette.mode === "dark" ? "rgba(226, 232, 240, 0.8)" : "rgba(30, 41, 59, 0.8)", 
                        mb: 2,
                        fontSize: '0.95rem',
                        maxWidth: { sm: "280px" }
                      }}>
                        {pkg.description}
                      </Typography>

                      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                        {features.map((feature, idx) => (
                          <FeatureBadge key={idx}>
                            {packageFeatureIcons[packageType]}
                            <Typography component="span" sx={{ ml: 0.5 }}>
                              {feature}
                            </Typography>
                          </FeatureBadge>
                        ))}
                      </Box>
                    </Box>
                  </Stack>

                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: { xs: "center", sm: "flex-end" },
                    justifyContent: "center",
                    mt: { xs: 2, sm: 0 }
                  }}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <BuyButton 
                        onClick={() => handleOpen(pkg)}
                        startIcon={<ShoppingCart size={20} />}
                        sx={{ width: { xs: "100%", sm: "auto" } }}
                      >
                        Purchase Now
                      </BuyButton>
                    </motion.div>
                  </Box>
                </Stack>
              </PackageCard>
            </motion.div>
          );
        })}
      </Box>

      {/* Payment Modal */}
      <Modal 
        open={open} 
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            {selectedPackage && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Purchase {selectedPackage.time} Package
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                  {selectedPackage.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Box>
            )}
            
            <StripePaymentForm
              packageDetails={selectedPackage}
              phone={phone}
              onSuccess={() => {
                handleClose();
              }}
              onError={(err) => setError(err.message)}
            />
            
            {error && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "error.main", 
                  mt: 2,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: "error.light",
                  opacity: 0.8
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}