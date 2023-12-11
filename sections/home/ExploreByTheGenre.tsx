import { getGenres } from "@/utils/api";
import { Genres, SelectedGenre } from "..";
import { GeneresProvider } from "@/context/genreContext";

async function ExploreByTheGenre() {
  const getgenres = await getGenres();
  const genres = getgenres.genres;

  return (
    <div className="relative h-[700px] mb-20">
      <GeneresProvider>
        <SelectedGenre genres={genres} />
      </GeneresProvider>
    </div>
  );
}

export default ExploreByTheGenre;
