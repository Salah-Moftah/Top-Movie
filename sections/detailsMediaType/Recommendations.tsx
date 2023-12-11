import { Headline, SwiperPoster } from "@/components";
import { IGenre, IMovieData } from "@/types/types";

type RecommendationsProps = {
  data?: IMovieData[];
  movieOrTv: string;
  loading: boolean;
  genres: IGenre[]
}

function Recommendations({data, movieOrTv, loading, genres} : RecommendationsProps) {

  return (
    <div className="sm:px-padding px-5 mx-auto mb-20 relative">
      {data && 
      <>
        <Headline title='Recommendations' />
        <SwiperPoster loading={loading} genres={genres} data={data} isMovieOrTv={movieOrTv} />
      </>
      }
    </div>
  );
}

export default Recommendations;