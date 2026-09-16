import { Search } from "lucide-react";
import { useContext } from "react";
import { ProductDataContext } from "../Context/ProductContext";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(ProductDataContext);

  return (
    <div className=" w-full text-center py-2 flex justify-center mt-4">
      <div className="border-2 border-blue-500 w-[70%] px-2 py-2 rounded-md flex gap-2 dark:bg-gray-900">
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
