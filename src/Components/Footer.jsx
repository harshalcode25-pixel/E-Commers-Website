function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ShopEase</h2>
          <p className="text-sm">
            Your one-stop shop for quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>

          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Track Order</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>

          <p className="mb-2">📍 Mumbai, India</p>
          <p className="mb-2">📧 support@shopease.com</p>
          <p>📞 +91 8999XXXXXX</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © 2026 ShopEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
