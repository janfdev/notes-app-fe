import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  onClearSearch: () => void;
};

const SearchBar = ({
  value,
  onChange,
  handleSearch,
  onClearSearch
}: SearchBarProps) => {
  return (
    <div className="md:w-80 w-60 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
        />
      )}
      <FaMagnifyingGlass
        className="text-gray-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
