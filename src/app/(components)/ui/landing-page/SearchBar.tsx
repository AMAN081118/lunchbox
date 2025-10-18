import React from "react";

const SearchBar = () => {
  return (
    <div className="">
      <div className="p-8 flex justify-between outline-1 outline-gray-400">
        <select className="w-[30%]">
          <option>H1</option>
          <option>H3</option>
          <option>H4</option>
        </select>
        <input placeholder="Search for canteen" />
      </div>
    </div>
  );
};

export default SearchBar;
