import { useContext } from "react";
import { ProductDataContext } from "../Context/ProductContext";

function ItemCategory() {
  const { selectedCategory, setSelectedCategory } =
    useContext(ProductDataContext);

  const categories = [
    { label: "All", value: "" },
    { label: "Headphones", value: "Headphone" },
    { label: "Laptops", value: "Laptop" },
    { label: "Mobiles", value: "Mobile" },
    { label: "Watches", value: "Watch" },
  ];

  return (
    <div className="p-3 flex justify-center">
      <div className="flex flex-wrap justify-center gap-4 font-bold">
        {categories.map(({ label, value }) => (
          <button
            key={label}
            type="button"
            onClick={() => setSelectedCategory(value)}
            className={`rounded-md px-3 py-1 shadow-md transition ${
              selectedCategory === value
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ItemCategory;
