import React from "react";
import ExploreTvAndMovies from "./exploreTvAndMovies";
import { TMediaType } from "@/types/types";

export async function generateMetadata({ params }: { params: { mediaType: TMediaType } }) {

  const mediaType = params.mediaType;

  return {
    title: `Explore ${(mediaType[0].toUpperCase() + mediaType.substring(1)).replace('-', ' ')} - Top Movie`,
    description: `Explore ${(mediaType[0].toUpperCase() + mediaType.substring(1)).replace('-', ' ')} list`,
  };
}

function ExplorePage({ params }: { params: { mediaType: TMediaType } }) {

  const mediaType = params.mediaType;

  return (
    <div>
      <ExploreTvAndMovies mediaType={mediaType} />
    </div>
  );
}

export default ExplorePage;
