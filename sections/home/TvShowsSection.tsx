"use client";

import { useEffect, useState } from "react";
import { IGenre, IMovieData } from "@/types/types";
import { getGenres, getTrendingTvShows } from "@/utils/api";
import { Headline, SwiperPoster } from "@/components";

function TvShowsSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        const data = await getTrendingTvShows();
        const genresData = await getGenres();

        setData(data.results);
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
      <Headline title="TV Shows" link="/discover/TV-Shows"/>
      <SwiperPoster
        genres={genres}
        data={data}
        loading={loading}
        isMovieOrTv="tv"
      />
    </div>
  );
}

export default TvShowsSection;
