"use client"


import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex items-center md:pr-0 pr-2">
      <div className="flex rounded">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="block sm:w-full w-[120px] px-2 py-1 sm:text-base text-sm bg-white border rounded-ss-full rounded-es-full focus:border-purple-400
        focus:ring-purple-300 focus:outline-none
          focus:ring focus:ring-opacity-40"
          placeholder="Search..."
        />
        <Link href={searchTerm === '' ? '#' : `/search/${searchTerm}`}
          className="sm:px-4 px-3 text-white
          bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 rounded-se-full
          rounded-ee-full flex justify-center items-center">
          <FaSearch />
        </Link>
      </div>
    </div>
  );
}

export default SearchInput;
