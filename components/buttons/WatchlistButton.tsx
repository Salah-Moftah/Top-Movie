"use client";

import { watchlistContext } from "@/context/watchlistContext";
import { WatchlistButtonProps } from "@/types/types";
import { useContext, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function WatchlistButton({ styles, mediaType, id, name } : WatchlistButtonProps) {

  const { watchlist, setWatchlist } = useContext(watchlistContext);
  
  function handleWatchlistToggle() {

    const itemIndex = watchlist.findIndex((data) => data.id === id && data.mediaType === mediaType);

    if (itemIndex === -1) {
      setWatchlist([...watchlist, { id, mediaType }]);
      toast.success(`${name} Added to watchlist`);
    } else {
      const updatedWatchlist = [...watchlist];
      updatedWatchlist.splice(itemIndex, 1);
      setWatchlist(updatedWatchlist);
      toast.error(`${name} Removed from watchlist`);
    }
  }

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const isItemInWatchlist = watchlist.some((data) => data.id === id && data.mediaType === mediaType);
  
  return (
    <div
      onClick={handleWatchlistToggle}
      className={`${styles} relative cursor-pointer inline-flex items-center justify-center py-3 overflow-hidden font-bold text-white rounded-lg shadow-2xl group`}
    >
      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 group-hover:opacity-100"></span>
      <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
      <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
      <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
      <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
      <span className="absolute inset-0 w-full h-full border border-white rounded-lg opacity-10"></span>
      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
      <span className="relative flex items-center gap-2 text-sm">
      {isItemInWatchlist ? (
        <FaBookmark className="text-white" />
      ) : (
        <FaRegBookmark className="text-white" />
      )} {isItemInWatchlist ? "Remove Watchlist" : "Add Watchlist"}
      </span>
    </div>
  );
}

export default WatchlistButton;
