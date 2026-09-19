import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import { ProductDataContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";

function AddCart() {
  const { cart, removeCart } = useContext(ProductDataContext);

  const [productQuatity, setProductQuatity] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    const quantity = productQuatity[item.id] || 1;

    return sum + Number(item.productPrice) * quantity;
  }, 0);

  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gray-950 dark:text-gray-100">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">My Cart</h1>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* LEFT SIDE - CART PRODUCTS */}
          <div className="w-full space-y-4 lg:w-2/3">
            {cart.map((item) => {
              const quantity = productQuatity[item.id] || 1;

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 bg-white shadow-lg rounded-xl p-4 sm:flex-row sm:items-center sm:p-5 dark:bg-gray-800"
                >
                  {/* Image */}
                  <img
                    src={item.img}
                    alt={item.productName}
                    className="h-32 w-full rounded-lg object-cover sm:w-32 sm:shrink-0"
                  />

                  {/* Product Details */}
                  <div className="flex-1 sm:ml-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      {item.productName}
                    </h2>

                    <p className="text-gray-500 mt-1 dark:text-gray-400">
                      {item.productInfo}
                    </p>

                    {/* Price */}
                    <p className="text-lg font-bold mt-3">
                      ₹{Number(item.productPrice) * quantity}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-3">
                      {/* - BUTTON */}
                      <button
                        className="w-8 h-8 bg-gray-200 rounded-lg text-xl dark:bg-gray-700"
                        onClick={() => {
                          if (quantity > 1) {
                            setProductQuatity({
                              ...productQuatity,
                              [item.id]: quantity - 1,
                            });
                          }
                        }}
                      >
                        -
                      </button>

                      <span className="font-semibold">{quantity}</span>

                      {/* + BUTTON */}
                      <button
                        className="w-8 h-8 bg-gray-200 rounded-lg text-xl dark:bg-gray-700"
                        onClick={() => {
                          setProductQuatity({
                            ...productQuatity,
                            [item.id]: quantity + 1,
                          });
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    className="w-full shrink-0 bg-red-500 text-white px-4 py-2 rounded-lg transition active:scale-90 sm:w-auto"
                    onClick={() => {
                      removeCart(item.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6 lg:sticky lg:top-4 dark:bg-gray-800">
              <h2 className="text-2xl font-bold mb-6">Product Summary</h2>

              <div className="flex justify-between mb-4">
                <span className="text-gray-600 dark:text-gray-300">
                  Products
                </span>

                <span className="font-semibold">{cart.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="text-gray-600 dark:text-gray-300">
                  Delivery
                </span>

                <span className="text-green-600">Free</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span>₹{total}</span>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm mt-4 text-center font-medium">
                  {error}
                </p>
              )}

              {/* Continue Button */}
              <button
                onClick={() => {
                  if (cart.length === 0) {
                    setError("Your cart is empty! Please add a product first.");
                    return;
                  }

                  setError("");
                  navigate("/card/orderSucces/customerInfo");
                }}
                className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 dark:hover:bg-gray-900  transition-all"
              >
                Continue to Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddCart;
