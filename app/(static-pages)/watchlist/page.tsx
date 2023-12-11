import Watchlist from "./Watchlist";

export async function generateMetadata() {
  return {
    title: "My Watchlist - Top Movie",
    description: "My Watchlist",
  };
}

function watchlistPage() {
  return (
    <div>
      <Watchlist />
    </div>
  );
}

export default watchlistPage;
