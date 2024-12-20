import SearchBar from "./components/search-bar";

interface HeaderProps {
  title: string;
  allowSearch?: boolean;
  searchPlaceholder?:string;
  searchValue: string;
  handleSearch: (searchValue: string) => void;
}

export default function Header({
  title,
  allowSearch = false,
  searchPlaceholder = "Search...",
  searchValue,
  handleSearch
}: HeaderProps) {
  return (
    <div className="px-5 h-16 flex justify-between items-center">
      <h3 className="font-medium text-sm">{title}</h3>
      {allowSearch && (
        <SearchBar searchValue={searchValue} handleSearch={handleSearch} searchPlaceholder={searchPlaceholder}/>
      )}
    </div>
  );
}
