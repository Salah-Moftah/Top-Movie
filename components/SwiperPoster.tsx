"use client";

import { IMovieData, SwiperPosterProps } from "@/types/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Poster from "./Poster";

function SwiperPoster({ data, genres, isMovieOrTv, loading }: SwiperPosterProps) {
  return (
    <div>
      {loading &&
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          breakpoints={{
            640: {
              width: 640,
              slidesPerView: 3,
            },
            768: {
              width: 768,
              slidesPerView: 4,
            },
            1024: {
              width: 1024,
              slidesPerView: 5,
            },
          }}
          
          loop={data ? true : false}
          navigation={data ? true : false}
          modules={[Navigation]}
          className="opacity-layer"
        >
          {data.map((movie: IMovieData) => (
                <SwiperSlide
                  className="rounded-2xl flex justify-center 
                  items-center relative overflow-hidden cursor-pointer"
                  key={movie.id}
                >
                  <Poster
                    movie={movie}
                    genres={genres}
                    isMovieOrTv={isMovieOrTv}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      }
    </div>
  );
}

export default SwiperPoster;
