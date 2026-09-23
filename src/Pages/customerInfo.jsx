import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductDataContext } from "../Context/ProductContext";
import OrderSuccess from "../Components/OrderSuccess";

function CustomerInfo() {
  const { cart, removePurchasedItems } = useContext(ProductDataContext);
  const [completedItems, setCompletedItems] = useState(null);
  const route = useLocation();
  const orderItems = completedItems ?? (route.state?.buyNow ? [route.state.buyNow] : cart);
  const total = orderItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderItems.length || orderSuccess) return;

    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setCompletedItems(orderItems.map((item) => ({ ...item })));
    removePurchasedItems(orderItems);
    setOrderSuccess(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-6 sm:p-6 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">

        {/* Header */}
        <div className="bg-black px-4 py-3 text-white">
          <div className="flex items-center gap-2">

            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-lg">
              📦
            </div>

            <div>
              <h1 className="text-lg font-bold">
                Delivery Details
              </h1>

              <p className="text-blue-100 text-sm">
                Enter your information
              </p>
            </div>

          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5">
          <div className="mb-5 rounded-lg bg-gray-50 p-3 text-sm dark:bg-gray-900">
            {orderItems.map((item) => <div key={item.id} className="mb-2 flex justify-between gap-3"><span>{item.productName} × {item.quantity}</span><strong className="whitespace-nowrap">₹{(item.productPrice * item.quantity).toLocaleString("en-IN")}</strong></div>)}
            <div className="flex justify-between border-t border-gray-200 pt-2 font-bold dark:border-gray-700"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
            {!orderItems.length && <Link to="/" className="mt-2 block text-blue-600">Your cart is empty. Browse products →</Link>}
          </div>

          {/* Name */}
          <div className="mb-3">

            <label className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-200">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:bg-gray-700 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}

          </div>

          {/* Mobile */}
          <div className="mb-3">

            <label className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-200">
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:bg-gray-700 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
            />

            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.mobile}
              </p>
            )}

          </div>

          {/* Location + Pincode */}
          <div className="grid grid-cols-1 gap-3 mb-3 sm:grid-cols-2 sm:gap-2">

            {/* Location */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-200">
                Location
              </label>

              <input
                type="text"
                placeholder="City"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:bg-gray-700 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
              />

              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location}
                </p>
              )}

            </div>

            {/* Pincode */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-200">
                Pincode
              </label>

              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:bg-gray-700 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
              />

              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.pincode}
                </p>
              )}

            </div>

          </div>

          {/* Address */}
          <div className="mb-4">

            <label className="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-200">
              Full Address
            </label>

            <textarea
              placeholder="House no, street, area..."
              rows="2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none resize-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:bg-gray-700 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
            ></textarea>

            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address}
              </p>
            )}

          </div>

          {/* Confirm Order */}
          <button
            type="submit"
            disabled={!orderItems.length || orderSuccess}
            className="w-full py-2.5 rounded-lg text-white font-semibold bg-black hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Confirm Order →
          </button>

          {/* Back to Cart */}
          <button
            type="button"
            onClick={() => navigate("/card")}
            className="w-full mt-2 py-2.5 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 hover:-translate-y-0.5 transition-all duration-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            ← Back to Cart
          </button>

        </form>
      </div>

      {orderSuccess && <OrderSuccess />}

    </div>
  );
}

export default CustomerInfo;
