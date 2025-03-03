import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

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
  { src: "/src/assets/wif8.jpg", title: "Reconnect with your loved ones" }, // Fixed filename
];

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }} // Prevent autoplay from stopping
      modules={[Pagination, Autoplay]}
      loop={true}
      style={{ width: "100%", padding: "20px 0" }}
    >
      {images.map((item, index) => (
        <SwiperSlide key={index}>
          <Card
            sx={{
              marginBottom: 5,
              borderRadius: 5,
              boxShadow: 8,
              background: "linear-gradient(to right, #2B2A2A, #EFEEEF)",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{ height: { xs: 120, sm: 200, lg: 300,backgroundRepeat:"no-repeat",backgroundAttachment:"fixed" } }}
                image={item.src}
                alt={item.title}
              />
              <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bolder"}
                  mt={-2}
                  ml={1}
                  component="div"
                >
                  {item.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
