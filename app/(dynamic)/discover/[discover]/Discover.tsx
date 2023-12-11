"use client";

import {
  getGenres,
  getTopRatedMovies,
  getTrendingMovies,
  getTrendingTvShows,
  getUpcomingMovies,
} from "@/utils/api";
import { useEffect, useState } from "react";
import { IGenre, IMovieData } from "@/types/types";
import MoviesGrid from "../../../../components/MoviesGrid";
import Skeleton from "react-loading-skeleton";
import PaginationButtons from "../../../../components/buttons/PaginationButtons";

type mediaTypeProps = {
  discover: string;
};

function Discover({ discover }: mediaTypeProps) {
  const [show, setShow] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        let apiFunction;

        if (discover.toLowerCase().replace("-", "").includes("trending")) {
          apiFunction = getTrendingMovies;
          setTitle("Trending Of The Week");
        } else if (
          discover.toLowerCase().replace("-", "").includes("toprated")
        ) {
          apiFunction = getTopRatedMovies;
          setTitle("Top Rated Movies");
        } else if (
          discover.toLowerCase().replace("-", "").includes("upcoming")
        ) {
          apiFunction = getUpcomingMovies;
          setTitle("Upcoming Movies");
        } else if (
          discover.toLowerCase().replace("-", "").includes("tvshows")
        ) {
          apiFunction = getTrendingTvShows;
          setTitle("TV Shows");
        }

        if (apiFunction) {
          const result = await apiFunction(show);
          const data = result.results;
          const totalPages = result.total_pages;
          const totalResults = result.total_results;

          const genresResult = await getGenres();
          const genre = genresResult.genres;

          setData(data);
          setTotalPages(totalPages);
          setTotalResults(totalResults);
          setGenres(genre);
        }

        setLoading(true);
      } catch (error) {
        setError(error);
        setLoading(true);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, [show]);

  return (
    <div className="md:px-padding px-5 mx-auto mb-20 sm:pt-36 pt-20">
      <div className="mb-9">
        <h1 className="md:text-2xl text-xl mb-1 font-medium text-white w-[300px]">
          {loading ? title : <Skeleton />}
        </h1>
        <p className="md:text-lg text-md mb-4 font-medium text-gray-500 w-[200px]">
          {loading ? (
            `${new Intl.NumberFormat().format(totalResults)} Movies`
          ) : (
            <Skeleton />
          )}
        </p>
      </div>
      <MoviesGrid data={data} genres={genres} loading={loading} mediaType="movie" />
      {data && data?.length > show && loading && (
        <div className="w-full flex justify-center mt-10">
          <PaginationButtons
            show={show}
            setShow={setShow}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}

export default Discover;
