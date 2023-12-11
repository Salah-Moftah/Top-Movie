import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { findGenre } from ".";
import { IGenre, PosterProps } from "@/types/types";

function Poster({ movie, genres, isMovieOrTv }: PosterProps) {
  return (
    <Link
      href={`/${movie.media_type ? movie.media_type : isMovieOrTv}/${movie.id}`}
      className="w-full"
    >
      <div className="md:min-h-[270px] min-h-[200px] overflow-hidden rounded-2xl relative">
        <Image
          src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '/no-poster.png'}
          alt={movie.title || movie.original_title || movie.name || "img"}
          fill
          sizes="100vh"
          className="rounded-2xl shadow-lg blur-lg transition-all duration-300"
          onLoadingComplete={(image) => image.classList.remove('blur-lg')}
        />
        <div
          className="absolute top-0 left-0
          w-full h-full bg-black
          opacity-10 rounded-2xl"
        />
        <div
          className="opacity-layer-poster absolute 
          -bottom-1 left-0 w-full h-[90px] rounded-b-2xl"
        />
      </div>
      <div className="absolute sm:bottom-1 -bottom-1 left-0 w-full p-3">
        <h4 className="text-white text-xs font-semibold line-clamp-1 mb-[5px]">
          {movie.title || movie.original_title || movie.name}
        </h4>
        <div className="text-xs font-semibold text-white flex gap-1 items-center">
          <FaStar className="text-sm text-yellow-300" />
          {movie.vote_average.toFixed(1)}{" "}
          <span className="text-gray-400 font-normal flex gap-1.5 items-center">
            |{" "}
            {!movie.genres ? 
              findGenre(movie.genre_ids, genres)
              .slice(0, 1)
              .map((g: IGenre) => (
                <span key={`${movie.id}_genre${g.id}`}>{g.name} </span>
              )) : 
              findGenre(movie.genres.map((e) => e.id), genres)
              .slice(0, 1)
              .map((g: IGenre) => (
                <span key={`${movie.id}_genre${g.id}`}>{g.name} </span>
              ))}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Poster;
