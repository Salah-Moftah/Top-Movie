"use client";

import { DetailsBanner, OfficialVideos, Recommendations, Reviews, Similar, TopCast } from "@/sections";
import { getGenres, getMovieCredits, getSelectedMovie } from "@/utils/api";
import { useEffect, useState } from "react";
import { ICast, ICrew, IGenre, IMovieData, TMediaType } from "@/types/types";

type mediaTypeProps = {
  id: string;
  mediaType: TMediaType;
}

function MediaType({ mediaType, id }: mediaTypeProps) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<IMovieData | null>(null);
  const [castData, setCastData] = useState<ICast[]>([]);
  const [crewData, setCrewData] = useState<ICrew[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        const [mediaTypeData, credits] = await Promise.all([
          getSelectedMovie(mediaType, id),
          getMovieCredits(mediaType, id),
        ]);

        const getgenres = await getGenres();
        const genres = getgenres.genres;

        setData(mediaTypeData);
        setCastData(credits.cast);
        setCrewData(credits.crew);
        setGenres(genres);

        setLoading(true);
      } catch (error) {
        setError(error);
        setLoading(true);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, [mediaType, id]);
  
  return (
    <div>
      <DetailsBanner
        data={data}
        id={id}
        mediaType={mediaType}
        crew={crewData}
        loading={loading}
      />
      <TopCast cast={castData} loading={loading} />
      <OfficialVideos data={data} loading={loading} /> 
      <Similar data={data?.similar?.results} movieOrTv={mediaType} loading={loading} genres={genres}/>
      <Recommendations data={data?.recommendations?.results} movieOrTv={mediaType} loading={loading} genres={genres} />
      <Reviews id={id} movieOrTv={mediaType} loading={loading} /> 
    </div>
  );
}

export default MediaType;