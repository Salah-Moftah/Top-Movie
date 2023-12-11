"use client";

import Link from "next/link";
import Image from "next/image";
import { IMovieData, SwiperHeroProps } from "@/types/types";
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function SwiperHero({ data, index, setIndex, loading }: SwiperHeroProps) {

  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="lg:w-1/2 w-full lg:px-0 sm:px-padding px-5">
      {loading && (
        <Swiper
          ref={swiperRef}
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
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={data ? true : false}
          navigation={data ? true : false}
          modules={[Navigation, Autoplay]}
          onActiveIndexChange={({ realIndex }) => {
            setIndex(realIndex);
          }}
        >
          {data.map((movie: IMovieData, indexMovie: number) => (
            <SwiperSlide
              className="rounded-2xl flex justify-center items-center overflow-hidden cursor-pointer"
              key={movie.id}
              onClick={() => {
                setIndex(indexMovie);
                if (swiperRef.current && swiperRef.current.swiper) {
                  swiperRef.current.swiper.slideTo(indexMovie);
                }
              }}
            >
              <Link href="#" className="w-full">
                <div className="md:min-h-[270px] min-h-[200px] relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title || movie.name || movie.original_title}
                    fill
                    sizes="100vh"
                    className="rounded-2xl shadow-lg blur-lg transition-all duration-300"
                    onLoadingComplete={(image) =>
                      image.classList.remove("blur-lg")
                    }
                  />
                  <div
                    className={`absolute top-0 left-0
                      w-full h-full bg-black
                      hover:opacity-0
                      ${index === indexMovie ? "opacity-0" : "opacity-30"}`}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default SwiperHero;
