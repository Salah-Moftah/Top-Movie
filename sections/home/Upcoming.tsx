"use client";

import { getGenres, getUpcomingMovies } from "@/utils/api";
import { Headline, SwiperPoster } from "@/components";
import { useEffect, useState } from "react";
import { IGenre, IMovieData } from "@/types/types";

function Upcoming() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [trendingMovies, setTrendingMovies] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        const upcomingMovies = await getUpcomingMovies();
        const genresData = await getGenres();

        setTrendingMovies(upcomingMovies.results);
        setGenres(genresData.genres);

        setLoading(true);
      } catch (error) {
        setError(error);
        setLoading(true);
      } finally {
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sm:px-padding px-5 mx-auto mb-20">
      <Headline title="Upcoming Movies" link='/discover/Upcoming' />
      <SwiperPoster
        genres={genres}
        data={trendingMovies}
        loading={loading}
        isMovieOrTv="movie"
      />
    </div>
  );
}

export default Upcoming;
