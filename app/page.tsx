import {
  Hero,
  ExploreByTheGenre,
  Trending,
  Upcoming,
  TopRatedSection,
  TvShowsSection,
} from "@/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <Trending />
      <Upcoming />
      <ExploreByTheGenre />
      <TopRatedSection />
      <TvShowsSection />
    </main>
  );
}
