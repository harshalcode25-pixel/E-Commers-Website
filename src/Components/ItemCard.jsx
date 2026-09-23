import { useContext } from "react";
import { Link } from "react-router-dom";
import { Star, Plus, Check } from "lucide-react";
import { ProductDataContext } from "../Context/ProductContext";

export default function ItemCard() {
  const { products, cart, addCart, searchQuery, selectedCategory } =
    useContext(ProductDataContext);
  const filtered = products.filter(
    (item) =>
      `${item.productName} ${item.productInfo} ${item.category}`
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase()) &&
      (!selectedCategory || item.category === selectedCategory),
  );
  return (
    <main className="pt-5 -mt-2 sm:pt-7 pb-8 mx-auto w-full max-w-6xl px-3 sm:px-6">
      <div className="mb-5 sm:mb-7 flex items-center justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Discover Your Favorites
          </h1>
        </div>
        <span className="text-gray-500 dark:text-gray-400">
          {filtered.length} products
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-6">
        {filtered.map((item) => {
          const added = cart.some((entry) => entry.id === item.id);
          return (
            <article
              className="group min-w-0 overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition hover:-translate-y-1 hover:shadow-lg"
              key={item.id}
            >
              <Link
                to={`/product/${item.id}`}
                className="block aspect-square sm:aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700"
              >
                <img
                  className="h-full w-full object-cover"
                  src={item.img}
                  alt={item.productName}
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-col gap-1.5 p-2 sm:gap-2 sm:p-4">
                <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-xs font-bold tracking-widest uppercase">
                  {item.category}
                </span>
                <Link to={`/product/${item.id}`}>
                  <h2 className="min-h-12 wrap-break-words text-xs font-semibold sm:text-base">
                    {item.productName}
                  </h2>
                </Link>
                <p className="hidden sm:block min-h-10 text-sm text-gray-500 dark:text-gray-400">
                  {item.productInfo}
                </p>
                <span className="inline-flex items-center gap-1 text-xs sm:text-xs text-yellow-500 dark:text-yellow-400">
                  <Star size={12} fill="currentColor" /> {item.rating}
                </span>
                <strong className="text-sm sm:text-lg tracking-tight whitespace-nowrap">
                  ₹{item.productPrice.toLocaleString("en-IN")}
                </strong>
                {added ? (
                  <Link
                    className="flex min-h-11 items-center justify-center gap-1 sm:gap-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold bg-blue-700 text-white dark:hover:bg-gray-900"
                    to="/card"
                  >
                    <Check className="hidden sm:block" size={14} /> In cart
                  </Link>
                ) : (
                  <button
                    className="flex min-h-11 items-center justify-center gap-1 sm:gap-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold text-white bg-black hover:bg-gray-800 active:scale-90 transition dark:hover:bg-gray-900"
                    onClick={() => addCart(item)}
                    aria-label={`Add ${item.productName} to cart`}
                  >
                    <Plus className="hidden sm:block" size={14} /> Add to cart
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {!filtered.length && (
        <div className="flex flex-col items-center gap-5 px-5 py-15 text-center">
          <h2 className="text-2xl font-bold">No products found</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Try another search or category.
          </p>
        </div>
      )}
    </main>
  );
}
