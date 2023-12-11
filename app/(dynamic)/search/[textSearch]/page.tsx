import React from 'react'
import Search from './Search';

function SearchPage({ params }: { params: { textSearch: string } }) {
  const searchInput = params.textSearch;
  return (
    <div>
      <Search searchInput={searchInput}/>
    </div>
  )
}

export default SearchPage