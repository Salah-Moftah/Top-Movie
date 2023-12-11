"use client";

import { Headline } from "@/components";
import { getGenres, getSelectedMovie, getTrendingMovies } from "@/utils/api";
import { TrendingSection } from "..";
import { IGenre, IMovieData } from "@/types/types";
import { useEffect, useState } from "react";

function Trending() {
  const [data, setData] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const getTrendingMovie = await getTrendingMovies();
      const trendingMovies = getTrendingMovie.results;

      const requests = trendingMovies.map(async (movie: any) => {
        const selectedMovie = await getSelectedMovie(movie.media_type, movie.id);
        return {
          ...selectedMovie,
          media_type: movie.media_type,
        };
      });

      const response = await Promise.all(requests);

      const getgenres = await getGenres();
      const genre = getgenres.genres;

      setData(response);
      setGenres(genre);
      setLoading(true);
    };

    fetchData();
  }, []);
  return (
    <div className="sm:px-padding px-5 mx-auto mb-20">
      <Headline title="Trending Of The Week" link="/discover/trending"/>
      <TrendingSection data={data} genres={genres} loading={loading} />
    </div>
  );
}

export default Trending;
