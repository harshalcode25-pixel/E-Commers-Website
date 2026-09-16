import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CustomerInfo() {
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

    setOrderSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

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
        <form onSubmit={handleSubmit} className="p-4">

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
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.mobile}
              </p>
            )}

          </div>

          {/* Location + Pincode */}
          <div className="grid grid-cols-2 gap-2 mb-3">

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
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 outline-none resize-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
            className="w-full py-2.5 rounded-lg text-white font-semibold bg-black hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Confirm Order →
          </button>

          {/* Back to Cart */}
          <button
            type="button"
            onClick={() => navigate("/card")}
            className="w-full mt-2 py-2.5 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            ← Back to Cart
          </button>

        </form>
      </div>

      {/* Order Success Popup */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-7 text-center animate-[popup_0.4s_ease-out]">

            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-5">

              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center animate-[scale_0.4s_ease-out]">

                <span className="text-white text-4xl font-bold">
                  ✓
                </span>

              </div>

            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Order Successful!
            </h2>

            <p className="text-gray-500 mt-2">
              Your order has been placed successfully.
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Thank you for shopping with us!
            </p>

            <Link
              to="/card"
              className="block w-full mt-6 py-3 rounded-lg text-center text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Done
            </Link>

          </div>
        </div>
      )}

    </div>
  );
}

export default CustomerInfo;
