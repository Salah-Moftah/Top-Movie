"use client";

import { useEffect, useState } from "react";
import { IGenre, IMovieData } from "@/types/types";
import { getGenres, getTopRatedMovies } from "@/utils/api";
import { Headline, SwiperPoster } from "@/components";

function TopRatedSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        const upcomingMovies = await getTopRatedMovies();
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

  return (
    <div className="sm:px-padding px-5 mx-auto mb-20">
      <Headline title="Top Rated Movies" link="/discover/Top-Rated" />
      <SwiperPoster genres={genres} loading={loading} data={data} isMovieOrTv="movie" />
    </div>
  );
}

export default TopRatedSection;
