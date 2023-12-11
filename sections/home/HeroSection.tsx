"use client";

import { useState } from "react";
import Image from "next/image";
import { IGenre, IMovieData, TMediaType } from "@/types/types";
import { ContentWrapper, SwiperHero } from "@/components";

interface heroSectionProps {
  data: IMovieData[];
  genres: IGenre[];
  isMovieOrTv: TMediaType;
  loading?: boolean;
}

function HeroSection({ data, genres, isMovieOrTv, loading }: heroSectionProps) {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className="w-full h-[100vh] bg-bg-primary relative">
      {loading && (
        <>
          <Image
            src={`https://image.tmdb.org/t/p/original/${data[index].backdrop_path}`}
            fill
            alt={data[index].title || "img"}
            className={`overflow-hidden opacity-50 md:object-fill object-cover`}
          />
          <div className="gradient-left sm:block hidden h-full w-[35%] absolute top-0 left-0" />
          <div className="gradient-bottom w-full h-[250px] absolute -bottom-1 left-0" />
        </>
      )}
      <div
        className="absolute flex flex-col lg:flex-row lg:justify-between justify-center
      gap-8 w-full h-full lg:h-[100vh] lg:items-center items-start"
      >
        <ContentWrapper
          data={data && data[index]}
          genres={genres}
          loading={loading}
          styles="md:pl-padding"
          overview={true}
          isMovieOrTv='movie'
          />
        <SwiperHero
          data={data}
          index={index}
          loading={loading}
          setIndex={setIndex}
        />
      </div>
    </div>
  );
}

export default HeroSection;
