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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">My Cart</h1>

        <div className="flex gap-8">

          {/* LEFT SIDE - CART PRODUCTS */}
          <div className="w-2/3 h-100 overflow-x-auto scrollbar-none">

            {cart.map((item) => {
              const quantity = productQuatity[item.id] || 1;

              return (
                <div
                  key={item.id}
                  className="flex items-center bg-white shadow-lg rounded-xl p-5 mb-5"
                >

                  {/* Image */}
                  <img
                    src={item.img}
                    alt={item.productName}
                    className="w-32 h-32 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="ml-6 flex-1">

                    <h2 className="text-xl font-bold text-gray-800">
                      {item.productName}
                    </h2>

                    <p className="text-gray-500 mt-1">
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
                        className="w-8 h-8 bg-gray-200 rounded-lg text-xl"
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

                      <span className="font-semibold">
                        {quantity}
                      </span>

                      {/* + BUTTON */}
                      <button
                        className="w-8 h-8 bg-gray-200 rounded-lg text-xl"
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
                    className="bg-red-500 text-white px-4 py-2 rounded-lg transition active:scale-90"
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
          <div className="w-1/3">

            <div className="bg-white shadow-lg rounded-xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Product Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span className="text-gray-600">
                  Products
                </span>

                <span className="font-semibold">
                  {cart.length}
                </span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="text-gray-600">
                  Delivery
                </span>

                <span className="text-green-600">
                  Free
                </span>
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
                    setError(
                      "Your cart is empty! Please add a product first."
                    );
                    return;
                  }

                  setError("");
                  navigate("/card/orderSucces/customerInfo");
                }}
                className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition"
              >
                Continue to Order
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddCart;
