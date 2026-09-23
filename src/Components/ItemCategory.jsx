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
    <div className="overflow-x-auto px-3 py-3">
      <div className="mx-auto flex w-max gap-2 text-xs font-semibold sm:text-sm">
        {categories.map(({ label, value }) => (
          <button
            key={label}
            type="button"
            aria-pressed={selectedCategory === value}
            onClick={() => setSelectedCategory(value)}
            className={`min-h-11 rounded-full px-4 py-2 transition ${
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
