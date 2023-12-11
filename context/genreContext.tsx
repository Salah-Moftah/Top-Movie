"use client";

import { createContext, useState } from "react";

type StateContextType = {
  exploreGenre: string | null;
  setExploreGenre: React.Dispatch<React.SetStateAction<string>>;
};
const iStateContextType = {
  exploreGenre: null,
  setExploreGenre: () => {}
}

export const GenresContext = createContext<StateContextType>(iStateContextType);

export const GeneresProvider = ({ children } : {children: React.ReactNode}) => {
  
  const [exploreGenre, setExploreGenre] = useState<string>('28')
  
  return (
    <GenresContext.Provider value={{ exploreGenre, setExploreGenre }}>
      {children}
    </GenresContext.Provider>
  );
};