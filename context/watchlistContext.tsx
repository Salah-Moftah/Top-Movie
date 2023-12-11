"use client";

import { IWatahlist } from "@/types/types";
import { createContext, useEffect, useState } from "react";

type StateContextType = {
  watchlist: IWatahlist[] | [];
  setWatchlist: React.Dispatch<React.SetStateAction<IWatahlist[]>>;
};
const iStateContextType = {
  watchlist: [],
  setWatchlist: () => {}
}

export const watchlistContext = createContext<StateContextType>(iStateContextType);

export const WatchlistProvider = ({ children } : {children: React.ReactNode}) => {
  
  const [watchlist, setWatchlist] = useState<IWatahlist[]>([]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist !== null) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);
  
  return (
    <watchlistContext.Provider value={{ watchlist, setWatchlist }}>
      {children}
    </watchlistContext.Provider>
  );
};