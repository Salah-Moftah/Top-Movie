"use client";

import { DetailsPerson, KnownFor } from "@/sections";
import { getGenres, getSelectedPerson } from "@/utils/api";
import { useEffect, useState } from "react";
import { IActor, IGenre, } from "@/types/types";

type mediaTypeProps = {
  id: string;
}

function Person({ id }: mediaTypeProps) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [data, setData] = useState<IActor | null>(null);
  const [genres, setGenres] = useState<IGenre[]>([]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        const [personData, genres] = await Promise.all([
          getSelectedPerson(id),
          getGenres(),
        ]);

        setData(personData);
        setGenres(genres.genres);

        setLoading(true);
      } catch (error) {
        setError(error);
        setLoading(true);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, [id]);
  
  return (
    <div>
      <DetailsPerson data={data} loading={loading} />
      <KnownFor data={data?.combined_credits?.cast} genres={genres} loading={loading} />
    </div>
  );
}

export default Person;