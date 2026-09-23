import { createContext, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { products } from "../Data/ProductData";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductDataContext = createContext();

function ProductContext(props) {
  const [notification, setNotification] = useState("");
  const notificationTimer = useRef(null);
  useEffect(() => () => clearTimeout(notificationTimer.current), []);
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("shop-cart") || "[]");
      return Array.isArray(saved) ? saved.filter((item) => products.some((product) => product.id === item.id)).map((item) => ({ ...products.find((product) => product.id === item.id), quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1)) })) : [];
    } catch { return []; }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    try { localStorage.setItem("shop-cart", JSON.stringify(cart)); } catch { /* Keep cart in memory if storage is unavailable. */ }
  }, [cart]);

  const addCart = (item, quantity = 1) => {
    setCart((current) => current.some((entry) => entry.id === item.id)
    ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: Math.min(99, entry.quantity + quantity) } : entry)
    : [...current, { ...item, quantity }]);
    setNotification(`${item.productName} added to cart`);
    clearTimeout(notificationTimer.current);
    notificationTimer.current = setTimeout(() => setNotification(""), 3000);
  };
  const updateQuantity = (id, quantity) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) } : item));

  const removeCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const removePurchasedItems = (purchasedItems) => {
    setCart((currentCart) => currentCart.flatMap((item) => {
      const purchased = purchasedItems.find((product) => product.id === item.id);
      if (!purchased) return [item];
      const remaining = item.quantity - purchased.quantity;
      return remaining > 0 ? [{ ...item, quantity: remaining }] : [];
    }));
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
          updateQuantity,
          removePurchasedItems,
        }}
      >
        {props.children}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`pointer-events-none fixed right-3 top-20 z-50 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg transition-[opacity,transform] duration-300 motion-reduce:transition-none sm:right-5 ${notification ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
        >
          {notification && <><Check className="size-5 shrink-0" aria-hidden="true" /><span>{notification}</span></>}
        </div>
      </ProductDataContext.Provider>
    </div>
  );
}

export default ProductContext;
