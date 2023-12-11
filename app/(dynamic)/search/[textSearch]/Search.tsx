"use client";

import { getGenres, search } from "@/utils/api";
import { useEffect, useState } from "react";
import { IGenre, IMovieData } from "@/types/types";
import MoviesGrid from "@/components/MoviesGrid";
import Skeleton from "react-loading-skeleton";
import { PaginationButtons } from "@/components";
import { TbMovieOff } from "react-icons/tb";

function Search({ searchInput }: { searchInput: string }) {
  const [show, setShow] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [movieData, setMovieData] = useState<IMovieData[]>([]);
  const [tvData, setTvData] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [totalPagesMovie, setTotalPagesMovie] = useState<number>(1);
  const [totalPagesTv, setTotalPagesTv] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalResultMovie, setTotalResultMovie] = useState<number>(0);
  const [totalResultTv, setTotalResultTv] = useState<number>(0);

  const [showData, setShowData] = useState<string>("movie");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        const movieSearch = await search("movie", searchInput, show);
        const tvSearch = await search("tv", searchInput, show);

        const movieData = movieSearch.results;
        const tvData = tvSearch.results;
        const totalPagesMovie = movieSearch.total_pages;
        const totalPagesTv = tvSearch.total_pages;
        const totalResultMovie = movieSearch.total_results;
        const totalResultTv = tvSearch.total_results;
        const totalResults = movieSearch.total_results + tvSearch.total_results;

        const genresResult = await getGenres();
        const genre = genresResult.genres;

        setMovieData(movieData);
        setTvData(tvData);
        setTotalPagesMovie(totalPagesMovie);
        setTotalPagesTv(totalPagesTv);
        setTotalResultMovie(totalResultMovie);
        setTotalResultTv(totalResultTv);
        setTotalResults(totalResults);
        setGenres(genre);

        setLoading(true);
      } catch (error) {
        setError(error);
        setLoading(true);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, [show, searchInput]);
  return (
    <div className="md:px-padding px-5 mx-auto mb-20 sm:pt-36 pt-20 min-h-[100vh]">
      {totalResults === 0 ? (
        <div className="w-full h-[700px] flex justify-center items-center">
          <div className="text-gray-500 font-bold w-full">
            <h1 className="md:text-3xl text-xl flex justify-center mb-2">
              Sorry, Results not found!
            </h1>
            <div className="md:text-9xl text-6xl flex justify-center">
              <TbMovieOff />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="sm:mb-9 mb-5 flex sm:flex-row flex-col sm:gap-8 gap-1">
            <h1 className="md:text-2xl text-xl mb-1 font-medium text-white">
              {loading ? "Search Result" : <Skeleton width={200} />}
            </h1>
            <div className="mb-4 font-medium flex gap-5">
              <div>
                {loading ? (
                  <div
                    className={`${
                      showData === "movie" ? "text-blue-500" : "text-gray-500"
                    } flex items-center gap-2 cursor-pointer`}
                    onClick={() => {
                      setShowData("movie");
                    }}
                  >
                    <span className="md:text-xl text-lg">Movies</span>
                    <span className="text-base">
                      {new Intl.NumberFormat().format(totalResultMovie)}
                    </span>
                  </div>
                ) : (
                  <Skeleton width={60} />
                )}
              </div>
              <div>
                {loading ? (
                  <div
                    className={`${
                      showData === "tv" ? "text-blue-500" : "text-gray-500"
                    } flex items-center gap-2 cursor-pointer`}
                    onClick={() => {
                      setShowData("tv");
                    }}
                  >
                    <span className="md:text-xl text-lg">Tv</span>
                    <span className="text-base">
                      {new Intl.NumberFormat().format(totalResultTv)}
                    </span>
                  </div>
                ) : (
                  <Skeleton width={60} />
                )}
              </div>
            </div>
          </div>
          <MoviesGrid
            data={showData === "movie" ? movieData : tvData}
            genres={genres}
            loading={loading}
          />
          {tvData && movieData && totalResults > show && loading && (
            <div className="w-full flex justify-center mt-10">
              <PaginationButtons
                show={show}
                setShow={setShow}
                totalPages={
                  showData === "movie" ? totalPagesMovie : totalPagesTv
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
