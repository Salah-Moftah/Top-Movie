"use client";

import Image from "next/image";
import { IMovieData, IGenre } from "@/types/types";
import { FaStar } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { findGenre } from "@/components";
import { findCertification } from "..";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

interface TrendingSectionProps {
  data: IMovieData[];
  genres: IGenre[];
  loading: boolean;
}

function TrendingSection({ data, genres, loading }: TrendingSectionProps) {
  const SkeletonSlide = () => (
    <div className="flex items-center justify-center gap-4">
      <div>
        <Skeleton width={60} height={60} />
      </div>
      <div>
        <Skeleton width={125} height={135} />
      </div>
      <div className="flex flex-col justify-between w-40 items-start gap-3">
        <div>
          <Skeleton width={60} />
        </div>
        <div>
          <Skeleton width={120} />
        </div>
        <div className="text-xs">
          <Skeleton width={60} />
        </div>
        <div className="text-xs">
          <Skeleton width={30} height={20} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 2,
          },
          768: {
            width: 768,
            slidesPerView: 2,
          },
          1024: {
            width: 1024,
            slidesPerView: 2.5,
          },
        }}
        modules={[Navigation]}
        navigation={data ? true : false}
        className="opacity-layer"
      >
        {loading
          ? data.map((movie: IMovieData, indexMovie: number) => (
              <SwiperSlide
                className="rounded-lg flex justify-center 
                items-center overflow-hidden cursor-pointer"
                key={movie.id}
              >
                <Link
                  href={`/${movie.media_type}/${movie.id}`}
                  className="flex items-center justify-center gap-4"
                >
                  <h1 className="text-white md:text-6xl text-4xl font-bold">
                    {indexMovie + 1}
                  </h1>
                  <div className="relative md:min-h-[135px] md:min-w-[125px] min-h-[115px] min-w-[105px]">
                    <Image
                      src={
                        movie.poster_path !== null
                          ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                          : "/no-poster.png"
                      }
                      alt={`${movie.id}`}
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
                  hover:opacity-0 opacity-30
                  rounded-xl`}
                    />
                  </div>
                  <div className="flex flex-col justify-between w-40 items-start gap-3">
                    <div className="border border-gray-400 p-1 rounded-md w-fit text-xs text-gray-200">
                      {findCertification(movie)}
                    </div>
                    <h4 className="text-white text-xs font-semibold line-clamp-1">
                      {movie.title || movie.original_title || movie.name}
                    </h4>
                    <p className="text-xs text-gray-400 flex gap-1 items-center">
                      <MdLocalMovies className="text-sm" />
                      {findGenre(
                        movie.genres.map((e) => e.id),
                        genres
                      )
                        .slice(0, 2)
                        .map((g: IGenre) => (
                          <span key={`${movie.id}_genre${g.id}`}>
                            {g.name}{" "}
                          </span>
                        ))}
                    </p>
                    <div className="text-xs font-semibold text-white flex gap-1 items-center">
                      <FaStar className="text-sm text-yellow-300" />
                      {movie.vote_average.toFixed(1)}{" "}
                      <span className="text-gray-400 font-normal">
                        | {movie.media_type}
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          : [...Array(6)].map((_, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center 
                items-center"
              >
                <SkeletonSlide />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default TrendingSection;
