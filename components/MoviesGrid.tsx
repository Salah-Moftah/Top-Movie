import { Poster } from "@/components";
import { MoviesGridProps } from "@/types/types";
import Skeleton from "react-loading-skeleton";

function MoviesGrid({data, loading, genres, mediaType} : MoviesGridProps) {
  return (
    <div>
      <div className="grid sm:grid-cols-16 grid-cols-2 sm:gap-10 gap-6">
        {!loading
          ? Array.from({ length: 20 }).map((_, index) => (
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
                <Poster movie={movie} genres={genres} isMovieOrTv={mediaType} />
              </div>
            ))}
      </div>
    </div>
  )
}

export default MoviesGrid