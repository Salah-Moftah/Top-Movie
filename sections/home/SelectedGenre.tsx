"use client";

import { IGenre, IMovieData } from "@/types/types";
import { getSelectedGenre, getSelectedMovie } from "@/utils/api";
import { useContext, useEffect, useState } from "react";
import { ContentWrapper } from "@/components";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { GenresContext } from "@/context/genreContext";
import { Genres } from "..";

function SelectedGenre({ genres }: { genres: IGenre[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<IMovieData[]>([]);

  const { exploreGenre } = useContext(GenresContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(false);

        const upcomingMovies = await getSelectedGenre(`${exploreGenre}`);
        setData(upcomingMovies.results);

        setLoading(true);
      } catch (error) {
        setError(error);
        setLoading(true);
      } finally {
        setLoading(true);
      }
    }
    fetchProducts();
  }, [exploreGenre]);
  

  return (
    <>
      <div className="z-10 top-40 relative sm:pl-padding px-5">
        {loading &&
          <h3
            className="text-white text-sm font-semibold
          bg-[#00000060] px-3 py-1 rounded-full w-fit mb-4"
          >
            Explore by the genre
          </h3>
        }
      </div>
      <Swiper
        navigation={loading ? true : false}
        modules={[Navigation]}
        className="w-full h-[700px]
        gradient-bottom gradient-top explore"
      >
        {loading ? data?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              fill
              alt={movie.title || movie.name || movie.original_title}
              className="overflow-hidden opacity-50 md:object-fill object-cover"
            />
            <div className="gradient-bottom w-full h-[150px] absolute -bottom-1 left-0" />
            <div className="gradient-top w-full h-[150px] absolute -top-1 left-0" />
            <div className="gradient-left sm:block hidden h-full w-[35%] absolute top-0 left-0" />
            <ContentWrapper
              data={movie}
              genres={genres && genres}
              loading={loading}
              styles="relative z-20 top-[160px] md:w-1/2 full"
              isMovieOrTv="movie"
            />
          </SwiperSlide>
        )) :
        <SwiperSlide>
          <div className="w-full h-full"></div>
        </SwiperSlide>}
      </Swiper>
      <Genres />
    </>
  );
}

export default SelectedGenre;
