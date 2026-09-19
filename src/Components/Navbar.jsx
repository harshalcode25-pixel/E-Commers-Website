import { House, Moon, ShoppingCart, Sun } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductDataContext } from "../Context/ProductContext";

function Navbar() {
  const { cart, isDarkMode, setIsDarkMode } = useContext(ProductDataContext);

  return (
    <nav className="flex w-full items-center justify-between border-gray-400 px-3 py-2 shadow-md sm:px-5 sm:py-3">
      <div className="flex items-center py-1 sm:py-2">
        <Link to="/">
          <House className="size-11 rounded-2xl p-2 text-gray-400 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 sm:size-15 sm:p-3" />
        </Link>

        <h1 className="text-2xl font-bold sm:text-4xl">Shop</h1>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <button
          type="button"
          onClick={() => setIsDarkMode((currentTheme) => !currentTheme)}
          className="rounded-lg p-2 text-gray-600 transition-all duration-300 hover:scale-110 hover:bg-gray-100 active:scale-95 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label={isDarkMode ? "Use light mode" : "Use dark mode"}
          title={isDarkMode ? "Use light mode" : "Use dark mode"}
        >
          <span
            className={`block transition-all duration-500 ease-in-out ${
              isDarkMode ? "rotate-180 scale-100" : "rotate-0 scale-90"
            }`}
          >
            {isDarkMode ? (
              <Sun className="size-6" />
            ) : (
              <Moon className="size-7" />
            )}
          </span>
        </button>

        <Link
          to="/card"
          className="relative"
          aria-label={`Cart with ${cart.length} ${cart.length === 1 ? "item" : "items"}`}
        >
          <ShoppingCart className="size-11 rounded-2xl p-2 text-gray-400 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 sm:size-15 sm:p-3" />
          {cart.length > 0 && (
            <span className="absolute -right-1 top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              {cart.length}
            </span>
          )}
        </Link>

        
      </div>
    </nav>
  );
}

export default Navbar;
