import { IMovieData } from "@/types/types";

export function findCertification(movie: IMovieData) {
  const firstCertificationWithValues = movie.releases?.countries.find(
    (country) => country.certification !== ''
  );

  return firstCertificationWithValues ? firstCertificationWithValues.certification : 'PG-13'
}