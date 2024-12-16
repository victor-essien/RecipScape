import React from 'react';

const SearchBar = () => {
  return (
    <div className="p-4 bg-white shadow flex items-center">
      <input type="text" className="flex-1 p-2 border rounded" placeholder="Search food recipe, restaurant, or review..." />
    </div>
  );
};

export default SearchBar;
