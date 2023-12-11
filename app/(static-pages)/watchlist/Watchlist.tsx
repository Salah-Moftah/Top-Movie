'use client';

import { getGenres, getSelectedMovie } from "@/utils/api";
import { useContext, useEffect, useState } from "react";
import { IGenre, IMovieData, IWatahlist } from "@/types/types";
import MoviesGrid from "@/components/MoviesGrid";
import Skeleton from "react-loading-skeleton";
import { watchlistContext } from "@/context/watchlistContext";
import { TbMovieOff } from "react-icons/tb";


function Watchlist() {

  const { watchlist } = useContext(watchlistContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<IMovieData[]>([]);
  const [tvData, setTvData] = useState<IMovieData[]>([]);
  const [movieData, setMovieData] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>();

  const [showData, setShowData] = useState<string>('all');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        
        const requests = watchlist.map(async (movie: IWatahlist) => {
          const selectedMovie = await getSelectedMovie(movie.mediaType, String(movie.id));
          return {
            ...selectedMovie,
            media_type: movie.mediaType,
          };
        });
        
        const response = await Promise.all(requests);

        const tv = response.filter(movie => {
          return movie.media_type === 'tv'
        })
        const movie = response.filter(movie => {
          return movie.media_type === 'movie'
        })

        const totalResults = response.length;
        
        const genresResult = await getGenres();
        const genre = genresResult.genres;

        setData(response);
        setTvData(tv);
        setMovieData(movie);
        setTotalPages(totalPages);
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
  }, [watchlist]);

  return (
    <div className="md:px-padding px-5 mx-auto mb-20 sm:pt-36 pt-20 min-h-[100vh]">
      {totalResults === 0 ?
      <div className="w-full h-[700px] flex justify-center items-center">
        <div className="text-gray-500 font-bold w-full">
          <h1 className="md:text-3xl text-xl flex justify-center mb-2">You Don't Have Watchlist</h1>
          <div className='md:text-9xl text-6xl flex justify-center'>
            <TbMovieOff />
          </div>
        </div>
      </div>
      : 
      <>
        <div className="sm:mb-9 mb-5 flex sm:flex-row flex-col sm:gap-8 gap-1">
          <h1 className="md:text-2xl text-xl mb-1 font-medium text-white">
            {loading ? 'My Watchlist' : <Skeleton width={200}/>}
          </h1>
          <div className="mb-4 font-medium flex gap-5">
            <div>
              {loading ? 
              <div className={`${showData === 'all' ? 'text-blue-500' : 'text-gray-500'} flex items-center gap-2 cursor-pointer`} onClick={() => {
                setShowData('all')
              }}>
                <span className="md:text-xl text-lg">All</span>
                <span className="text-base">{new Intl.NumberFormat().format(totalResults || 0)}</span>
              </div>
              : <Skeleton width={60} />}
            </div>
            <div>
              {loading ? 
              <div className={`${showData === 'movie' ? 'text-blue-500' : 'text-gray-500'} flex items-center gap-2 cursor-pointer`} onClick={() => {
                setShowData('movie')
              }}>
                <span className="md:text-xl text-lg">Movies</span>
                <span className="text-base">{new Intl.NumberFormat().format(movieData.length)}</span>
              </div>
              : <Skeleton width={60} />}
            </div>
            <div>
              {loading ? 
              <div className={`${showData === 'tv' ? 'text-blue-500' : 'text-gray-500'} flex items-center gap-2 cursor-pointer`} onClick={() => {
                setShowData('tv')
              }}>
                <span className="md:text-xl text-lg">Tv</span>
                <span className="text-base">{new Intl.NumberFormat().format(tvData.length)}</span>
              </div>
              : <Skeleton width={60} />}
            </div>
          </div>
        </div>
        <MoviesGrid
          data={showData === 'all' ? data : showData === 'movie' ? movieData : tvData}
          genres={genres}
          loading={loading}
        />
      </>}
    </div>
  );
}

export default Watchlist