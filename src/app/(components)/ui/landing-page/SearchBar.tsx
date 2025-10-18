import React from "react";
import { ChevronDown, MapPin, Search } from "lucide-react";

// The options list type
type LocationOption = {
  value: string;
  label: string;
};

const locations: LocationOption[] = [
  { value: "H1", label: "H1 Canteen" },
  { value: "H3", label: "H3 Canteen" },
  { value: "default", label: "H4 Canteen" }, // Default location based on image context
];

const SearchBar: React.FC = () => {
  return (
    <div className="flex justify-center w-full mt-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        {/* Main Search Container */}
        <div className="flex h-14 sm:h-16 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
          {/* 1. Location Dropdown Section */}
          <div className="flex items-center p-3 sm:p-4 border-r border-gray-200 w-1/3 sm:w-auto">
            <MapPin className="h-5 w-5 text-red-500 mr-2" />

            <select
              className="appearance-none bg-transparent border-none text-gray-700 font-medium focus:outline-none cursor-pointer pr-6 text-base sm:text-lg"
              defaultValue="default"
            >
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>

            {/* Custom chevron icon positioned over the native dropdown arrow */}
            <ChevronDown className="h-4 w-4 text-gray-400 -ml-5 pointer-events-none" />
          </div>

          {/* 2. Search Input Section */}
          <div className="flex items-center flex-grow p-3 sm:p-4">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search for canteen, dish, or cuisine"
              className="w-full border-none text-gray-500 placeholder-gray-400 focus:outline-none text-base sm:text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
