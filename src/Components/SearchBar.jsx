import { Search } from "lucide-react";
import { useContext } from "react";
import { ProductDataContext } from "../Context/ProductContext";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(ProductDataContext);

  return (
    <div className="mt-4 flex w-full justify-center px-4 py-2 sm:px-6">
      <div className="flex w-full max-w-3xl gap-2 rounded-md border-2 border-blue-500 px-2 py-2 dark:bg-gray-900">
        <Search className="opacity-50 cursor-pointer" />
        <input
          className="w-full h-full border-none bg-transparent focus:outline-none focus:ring-0"
          type="text"
          placeholder="search product"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
