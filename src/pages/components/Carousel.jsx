import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const images = [
  { src: "/src/assets/wifi.jpg", title: "Fast Connection" },
  { src: "/src/assets/wifi1.jpg", title: "Fast Connection" },
  { src: "/src/assets/wifi2.jpg", title: "SmartWIFI" },
  { src: "/src/assets/wifi3.jpg", title: "Secure Network" },
  { src: "/src/assets/wifi4.jpg", title: "Stay On Top Of the Game" },
  {
    src: "/src/assets/wifi5.jpg",
    title: "Great Lengths To Secure the Bag",
  },
  { src: "/src/assets/wifi6.jpg", title: "Work Smart" },
  { src: "/src/assets/wifi7.jpg", title: "Stay True" },
  { src: "/src/assets/wifi8.jpg", title: "Reconnect with Your Loved Ones" }, // Fixed filename
];

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay, Navigation]}
      loop={true}
      style={{ width: "100%", padding: "10px 0" }}
    >
      {images.map((item, index) => (
        <SwiperSlide key={index}>
          <Card
            sx={{
              position: "relative",
              borderRadius: 4,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  height: { xs: 180, sm: 250, md: 350 },
                  filter: "brightness(0.8)",
                  transition: "filter 0.3s ease-in-out",
                  "&:hover": { filter: "brightness(1)" },
                }}
                image={item.src}
                alt={item.title}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  textAlign: "center",
                  py: 1,
                  backdropFilter: "blur(5px)",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
