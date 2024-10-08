"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../styles.css";

interface SliderProps {
  slideItems: string[];
}

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

export default function SliderItem({ slideItems }: SliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {slideItems && slideItems.length > 0 && (
        <div>
          <Swiper
            spaceBetween={10}
            navigation={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: true,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2"
          >
            {slideItems &&
              slideItems.map((slide, i) => (
                <SwiperSlide key={i}>
                  <img src={slide} className="mx-auto max-h-96" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
