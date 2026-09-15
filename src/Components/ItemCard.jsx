import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductDataContext } from "../Context/ProductContext";

function ItemCard() {
  const { products, cart, addCart, searchQuery, selectedCategory } = useContext(ProductDataContext);

  const [notification, setNotification] = useState("");
  const notificationTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(notificationTimer.current);
  }, []);

  const handleAddToCart = (item) => {
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      return;
    }

    addCart(item);

    setNotification(`${item.productName} added to cart`);

    clearTimeout(notificationTimer.current);

    notificationTimer.current = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const filteredProducts = products.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch = (
      item.productName.toLowerCase().includes(query) ||
      item.productInfo.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );

    return matchesSearch && (!selectedCategory || item.category === selectedCategory);
  });

  return (
    <>
      {/* Notification */}
      {notification && (
        <div
          className="fixed right-5 top-20 z-50 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg animate-[slideIn_0.4s_ease-out]"
          role="status"
        >
          ✓ {notification}
        </div>
      )}

      {/* Products */}
      <div className="grid grid-cols-1 gap-8 px-6 py-6 pt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((item) => {
          return (
            <div
              key={item.id}
              className="w-full max-w-64 bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-2xl hover:scale-103 transition duration-300"
            >
              <img
                src={item.img}
                alt={item.productName}
                className="w-full h-50 object-cover"
              />

              <div className="p-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.productName}
                </h2>

                <p className="text-sm text-gray-500 mt-1">{item.productInfo}</p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{item.productPrice}
                  </span>

                  <span className="text-sm text-yellow-500">
                    ⭐ {item.rating}
                  </span>
                </div>

                <button
                  className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition active:bg-blue-700 active:scale-90"
                  onClick={() => handleAddToCart(item)}
                >
                  {cart.some((cartItem) => cartItem.id === item.id)
                    ? "Added"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <p className="w-full py-10 text-center text-lg text-gray-500">
            No products found for “{searchQuery}”.
          </p>
        )}
      </div>
    </>
  );
}

export default ItemCard;
