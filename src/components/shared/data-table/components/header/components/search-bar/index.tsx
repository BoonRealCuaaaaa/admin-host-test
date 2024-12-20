import { Search } from "react-bootstrap-icons";

export interface SearchBarProps {
  searchPlaceholder: string;
  searchValue: string;
  handleSearch: (searchValue: string) => void;
}

export default function SearchBar({ handleSearch, searchPlaceholder, searchValue }: SearchBarProps) {
  return (
    <div className="flex border bg-gray-50 border-gray-300  rounded-md gap-x-2 overflow-hidden h-8 px-3">
      <div className="flex items-center"><Search  className="text-sm"/></div>
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchValue}
        className="bg-gray-50 text-[#78829D] text-sm focus:outline-0"
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
}
