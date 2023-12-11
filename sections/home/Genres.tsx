"use client";

import { IGenre } from "@/types/types";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { GenresContext } from "@/context/genreContext";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getGenres } from "@/utils/api";

function Genres() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(false);

        const genresResult = await getGenres();
        const genre = genresResult.genres;
        setGenres(genre);

        setLoading(true);
      } catch (error) {
        setError(error);
        setLoading(true);
      } finally {
        setLoading(true);
      }
    }
    fetchProducts();
  }, []);

  const { exploreGenre, setExploreGenre } = useContext(GenresContext);

  return (
    <div className="sm:pl-padding pl-5 z-10 w-full bottom-60 relative flex justify-center">
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
        modules={[Navigation]}
        navigation={genres ? true : false}
        className="w-full flex justify-center items-center"
      >
        {loading &&
          genres.map((genre: IGenre) => (
            <SwiperSlide
              className={`rounded-2xl flex justify-center items-center
            overflow-hidden cursor-pointer relative
            ${
              genre.id === Number(exploreGenre)
                ? "border-2 border-l-blue-600 border-t-blue-600 border-r-pink-700 border-b-pink-700"
                : ""
            }`}
              key={genre.id}
              onClick={() => {
                setExploreGenre(String(genre.id));
              }}
            >
              <div className="min-h-[100px] relative">
                <Image
                  src={`/${genre.name.replace(/ /g, "-")}.jpg`}
                  alt={genre.name}
                  fill
                  sizes="100vh"
                  className="rounded-2xl shadow-lg blur-lg transition-all duration-300"
                  onLoadingComplete={(image) =>
                    image.classList.remove("blur-lg")
                  }
                />
                <div
                  className={`absolute top-0 left-0
                  w-full h-full opacity-30
                  ${
                    genre.id === Number(exploreGenre)
                      ? "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"
                      : "bg-black"
                  }`}
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <h4 className="text-white text-sm font-semibold">
                  {genre.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Genres;
