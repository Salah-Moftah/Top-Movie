'use client';

import { CustomFilterGenres, PaginationButtons } from "@/components";
import MoviesGrid from "@/components/MoviesGrid";
import { IFilterProps, IGenre, IMovieData, IOptionProps, TMediaType } from "@/types/types";
import { getDiscoverMovies, getTvGenres, getTvShows } from "@/utils/api";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { yearsOfProduction } from "@/constants";
import { genresTvShows } from "@/constants";
import { gneresMovie } from "@/constants";


function ExploreTvAndMovies({ mediaType }: {mediaType: TMediaType}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  
  const [show, setShow] = useState(1);
  const [filter, setFilter] = useState<IFilterProps>({
    genre: '',
    year: '',
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        let apiFunction;

        if (mediaType === 'tv') {
          apiFunction = getTvShows;
          setTitle('TV Shows')
        } else {
          apiFunction = getDiscoverMovies;
          setTitle('Movies')
        }

        if (apiFunction) {
          const data = await apiFunction(filter, show);
          const genresData = await getTvGenres();
          const totalPages = data.total_pages;
          const totalResults = data.total_results;

          setData(data.results);
          setGenres(genresData.genres);
          setTotalPages(totalPages);
          setTotalResults(totalResults);
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
  }, [filter, show]);

  return (
    <div className="md:px-padding px-5 mx-auto mb-20 sm:pt-36 pt-20">
      <div className="flex sm:flex-row flex-col justify-between items-start mb-9">
        <div> 
          <h1 className="md:text-2xl text-xl mb-1 font-medium text-white w-[300px]">
            {loading ? title : <Skeleton />}
            </h1>
          <p className="md:text-lg text-md mb-4 font-medium text-gray-500 w-[200px]">
            {loading ? `${new Intl.NumberFormat().format(totalResults)} Results` : <Skeleton />}
          </p>
        </div>
        <div className="relative z-10 flex sm:flex-row flex-col sm:w-1/2 justify-end w-full gap-4">
          <CustomFilterGenres styles='z-[100]' options={mediaType === 'tv' ? genresTvShows : gneresMovie} handleFilter={(e: IOptionProps) => setFilter({...filter, genre: e.value})} />
          <CustomFilterGenres options={yearsOfProduction} handleFilter={(e: IOptionProps) => setFilter({...filter, year: e.value})} />
        </div>
      </div>
      <MoviesGrid
        data={data}
        genres={genres}
        loading={loading}
        mediaType={mediaType}
      />
      {data && data?.length > show && loading && (
        <div className="w-full flex justify-center mt-10">
          <PaginationButtons show={show} setShow={setShow} totalPages={totalPages}/>
        </div>
      )}
    </div>
  )
}

export default ExploreTvAndMovies