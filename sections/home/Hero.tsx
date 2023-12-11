"use client";

import { useEffect, useState } from "react";
import { IGenre, IMovieData } from "@/types/types";
import { getPopularMovies, getGenres } from "@/utils/api";
import { HeroSection } from "..";


function Hero() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        const upcomingMovies = await getPopularMovies();
        const genresData = await getGenres();

        setData(upcomingMovies.results);
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

  return <HeroSection data={data} genres={genres} loading={loading} isMovieOrTv='movie'/>;
}

export default Hero;
