
export interface IOptionProps {
  title: string;
  value: string
}

export interface IWatahlist {
  id: number;
  mediaType: TMediaType;
}

export interface IFilterProps {
  genre: string;
  year: string;
}

export interface IFilterState {
  tv: IFilterProps;
  discover: IFilterProps;
}

export interface ICountries {
  certification: string;
  descriptors?: [] | null;
  iso_3166_1: string;
  primary: boolean;
  release_date: string;
}

export type TFilterCategory = "discover" | "tv";

export type TMediaType = "movie" | "tv";

export interface IMovieData {
  adult?: boolean;
  name?: string;
  id: number;
  poster_path: string;
  original_name: string;
  original_title: string;
  original_language: string;
  release_date: string;
  first_air_date: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  title: string;
  homepage: string;
  genres: IGenre[];
  overview: string;
  popularity: number;
  budget: number;
  genre_ids: IMovieGenreIds;
  imdb_id: string | null;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string | null;
  media_type?: TMediaType;
  production_countries?: any;
  spoken_languages?: any;
  video?: boolean;
  videos: {
    id: number;
    results: IVideo[];
  };
  similar?: IResponse<IMovieData[]>;
  recommendations?: IResponse<IMovieData[]>;
  images?: {
    backdrops: IImage[];
    posters: IImage[];
  };
  releases?: {
    countries: ICountries[];
  };
}

export interface IVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  official: boolean;
  published_at: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export type IMovieGenreIds = Array<number>;

export interface IImage {
  file_path: string;
  aspect_ratio: number;
  height: number;
  width: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IExternal_ids {
  facebook_id: string | null;
  freebase_id: string | null;
  freebase_mid: string | null;
  imdb_id: string | null;
  instagram_id: string | null;
  tiktok_id: null;
  tvrage_id: number | null;
  twitter_id: string | null;
  wikidata_id: string | null;
  youtube_id: string | null;
}

export interface IReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ICrew {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for?: IMovieData[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  other: number;
}

export interface IActor extends ICast {
  poster_path: any;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string;
  place_of_birth: string;
  images: {
    profiles: IImage[];
  };
  combined_credits?: {
    cast: IMovieData[];
    crew: IMovieData[];
  };
  movie_credits?: {
    cast: IMovieData[];
    crew: IMovieData[];
  };
  tv_credits?: {
    cast: IMovieData[];
    crew: IMovieData[];
  };
  external_ids: IExternal_ids;
}

export interface IResponse<T> {
  page: number;
  results: T;
  total_results: number;
  total_pages: number;
}

export interface SwiperHeroProps {
  data: IMovieData[];
  index: number | null;
  loading?: boolean;
  setIndex: (index: number) => void;
}

export interface ContentWrapperProps {
  data: IMovieData;
  genres: IGenre[];
  styles: string;
  loading?: boolean;
  overview?: boolean;
  isMovieOrTv: TMediaType;
}

export interface DetailsBannerProps {
  data: IMovieData | null;
  id: string;
  mediaType: TMediaType;
  crew: ICrew[];
  loading: boolean;
}

export interface DetailsButtonProps {
  id?: number;
  title: string;
  styles?: string;
  media_type?: TMediaType;
  isMovieOrTv?: TMediaType;
  videoKey?: string | null;
  setShow?: (show: boolean) => void;
  setVideoId?: (videoId: string | null) => void;
}

export interface VideoModelProps {
  show: boolean;
  setShow: (show: boolean) => void;
  videoId: string | null;
  setVideoId: (videoId: string | null) => void;
}

export interface SwiperPosterProps {
  data: IMovieData[]
  genres: IGenre[];
  isMovieOrTv?: string;
  loading?: boolean;
};

export interface ShowMoreButtonProps {
  title: string;
  styles?: string;
  setShow: (show: number) => void;
  show: number;
}

export interface PaginationButtonsProps {
  setShow: (show: number) => void;
  show: number;
  totalPages: number;
}

export interface MoviesGridProps {
  data: IMovieData[];
  genres: IGenre[];
  loading: boolean;
  mediaType?: TMediaType;
}

export interface PosterProps {
  movie: IMovieData;
  genres: IGenre[];
  isMovieOrTv?: string;
}

export interface CustomFilterGenresProps {
  options: IOptionProps[],
  handleFilter: (value: IOptionProps) => void,
  styles?: string,
}

export interface WatchlistButtonProps {
  styles?: string;
  mediaType: TMediaType;
  id: number;
  name: string | number;
}
