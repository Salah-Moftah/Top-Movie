"use client";

import { Poster, ShowMoreButton } from "@/components";
import { IGenre, IMovieData } from "@/types/types";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

type KnownForProps = {
  data?: IMovieData[];
  genres: IGenre[];
  loading: boolean;
};

function KnownFor({ data, genres, loading }: KnownForProps) {
  const [show, setShow] = useState(18);

  return (
    <div className="md:px-padding px-5 mx-auto mb-20">
      <h2 className="md:text-2xl text-xl mb-4 font-medium text-white">
        Known For
      </h2>
      <div className="grid sm:grid-cols-16 grid-cols-2 sm:gap-10 gap-6">
        {!loading
          ? Array.from({ length: 18 }).map((_, index) => (
              <div
                key={index}
                className="relative sm:h-[270px] sm:w-[200px] h-[200px] w-[150px] mx-auto"
              >
                <Skeleton width='100%' height='100%' />
              </div>
            ))
          : data?.map((movie) => (
              <div
                key={movie.id}
                className="relative sm:h-[270px] sm:w-[200px] h-[200px] w-[150px] mx-auto"
              >
                <Poster movie={movie} genres={genres} />
              </div>
            )).slice(0, show)}
      </div>
      {data && data?.length > show && loading && (
        <div className="w-full flex justify-center mt-10">
          <ShowMoreButton title="Show More" show={show} setShow={setShow} />
        </div>
      )}
    </div>
  );
}

export default KnownFor;

