import { House, Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductDataContext } from "../Context/ProductContext";

function Navbar() {
  const { cart, isDarkMode, setIsDarkMode } = useContext(ProductDataContext);

  return (
    <div className="px-5 py-3 flex justify-between w-full border-gray-400 shadow-md">
      <div className="flex justify-center items-center  py-2">
        <Link to="/">
          <House  className="text-gray-400 size-15 p-3 rounded-2xl dark:text-gray-300 dark:hover:bg-gray-700  transition-all hover:bg-gray-100"  />
        </Link>

        <h1 className="font-bold text-4xl">Shop</h1>
      </div>

      <div className="flex justify-between items-center gap-3 ">
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
          <ShoppingCart className="text-gray-400 size-15 p-3 rounded-2xl dark:text-gray-300 dark:hover:bg-gray-700  transition-all hover:bg-gray-100" />
          {cart.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              {cart.length}
            </span>
          )}
        </Link>

        
      </div>
    </div>
  );
}

export default Navbar;
