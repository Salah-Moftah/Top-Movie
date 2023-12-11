import { Headline, SwiperPoster } from "@/components";
import { IGenre, IMovieData } from "@/types/types";

type SimilarProps = {
  data?: IMovieData[];
  movieOrTv: string;
  loading: boolean;
  genres: IGenre[]
}

function Similar({data, movieOrTv, loading, genres} : SimilarProps) {

  return (
    <div className="sm:px-padding px-5 mx-auto mb-20 relative">
      {data && 
      <>
      <Headline title={`Similar ${movieOrTv === 'movie' ? 'Movies' : 'Series'}`} />
      <SwiperPoster loading={loading} genres={genres} data={data} isMovieOrTv={movieOrTv} />
      </>
      }
    </div>
  );
}

export default Similar;
