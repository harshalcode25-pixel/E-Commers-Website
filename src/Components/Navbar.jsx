import { House, Menu, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductDataContext } from "../Context/ProductContext";

function Navbar() {
  const { cart } = useContext(ProductDataContext);

  return (
    <div className="px-5 py-3 flex justify-between w-full  border-gray-400 shadow-md ">
      <div className="flex justify-center items-center gap-3 py-2">

       <Link to='/'><House className="text-gray-400 size-10 pt-" /></Link>
      
        <h1 className="font-bold text-4xl">Shop</h1>
      </div>

      <div className="flex justify-between items-center gap-3">
       
      <Link
        to="/card"
        className="relative"
        aria-label={`Cart with ${cart.length} ${cart.length === 1 ? "item" : "items"}`}
      >
        <ShoppingCart className="text-gray-400 size-8" />
        {cart.length > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {cart.length}
          </span>
        )}
      </Link>

        <Menu className="size-7" />
      </div>
    </div>
  );
}

export default Navbar;
