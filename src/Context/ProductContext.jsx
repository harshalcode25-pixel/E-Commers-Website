import { createContext, useEffect, useState } from "react";
import { products } from "../Data/ProductData";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductDataContext = createContext();

function ProductContext(props) {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const addCart = (item) => {
    setCart((currentCart) => [...currentCart, item]);
  };

  const removeCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <ProductDataContext.Provider
        key={products.id}
        value={{
          products,
          cart,
          searchQuery,
          setSearchQuery,
          selectedCategory,
          setSelectedCategory,
          isDarkMode,
          setIsDarkMode,
          addCart,
          removeCart,
        }}
      >
        {props.children}
      </ProductDataContext.Provider>
    </div>
  );
}

export default ProductContext;
