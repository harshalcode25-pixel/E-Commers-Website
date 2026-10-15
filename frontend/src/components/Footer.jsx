import React from 'react'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-10 bg-black px-5 pb-5 pt-10 text-slate-300">
      <div className="flex flex-wrap justify-center gap-20">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 font-semibold text-white">Shop</h3>
          <Link to="/products" className="hover:text-white hover:underline">
            All products
          </Link>
          <Link to="/cart" className="hover:text-white hover:underline">
            Cart
          </Link>
        </div>
 
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 font-semibold text-white">Account</h3>
          <Link to="/signin" className="hover:text-white hover:underline">
            Sign in
          </Link>
          <Link to="/register" className="hover:text-white hover:underline">
            Register
          </Link>
        </div>
      </div>
 
      <p className="mt-8 text-center text-sm">
        © 2026 My Store. All rights reserved.
      </p>
    </footer>
  );
  
}

export default Footer
