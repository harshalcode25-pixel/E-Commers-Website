import { createContext, useState } from "react";
import { products } from "../Data/ProductData";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductDataContext = createContext();

function ProductContext(props) {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
