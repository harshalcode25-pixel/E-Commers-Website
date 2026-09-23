import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Star, Truck, ShoppingBag } from "lucide-react";
import Navbar from "../Components/Navbar";
import QuantityControl from "../Components/QuantityControl";
import { ProductDataContext } from "../Context/ProductContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, addCart } = useContext(ProductDataContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const product = products.find((item) => String(item.id) === id);
  if (!product)
    return (
      <>
        <Navbar />
        <main className="flex flex-col items-center gap-4.5 px-5 py-15 text-center [&_h2]:text-2xl [&_h2]:font-bold">
          <h1>Product not found</h1>
          <Link
            className="min-h-12 px-4.5 py-3 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-center bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-900"
            to="/"
          >
            Back to shop
          </Link>
        </main>
      </>
    );
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-300 px-3 sm:px-6 pt-5.5 pb-10">
        <Link
          className="mb-4.5 inline-flex min-h-11 items-center gap-2 text-[13px] text-gray-500 dark:text-gray-400"
          to="/"
        >
          <ArrowLeft size={16} /> Back to shopping
        </Link>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.1fr_1fr] sm:gap-7 min-[901px]:gap-14 items-start">
          <div className="overflow-hidden rounded-[22px] bg-gray-100 dark:bg-gray-700 [&_img]:w-full [&_img]:aspect-[1.2] [&_img]:max-h-95 sm:[&_img]:aspect-square sm:[&_img]:max-h-none [&_img]:object-cover">
            <img src={product.img} alt={product.productName} />
          </div>
          <section className="px-1 py-4 sm:px-0 sm:py-5 [&_h1]:mt-3 [&_h1]:mb-4 [&_h1]:text-[clamp(28px,4vw,40px)] [&_h1]:leading-[1.15] [&_h1]:font-bold [&_h1]:tracking-[-.04em]">
            <p className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-[11px] font-bold tracking-widest uppercase">
              {product.category}
            </p>
            <h1>{product.productName}</h1>
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-yellow-500 dark:text-yellow-400">
              <Star size={16} fill="currentColor" /> {product.rating}{" "}
              <span className="text-gray-500 dark:text-gray-400">
                / 5 rating
              </span>
            </span>
            <p className="mt-4 sm:mt-6 mb-2.5 text-[32px] font-bold">
              ₹{product.productPrice.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-500 dark:text-gray-400 hidden sm:block text-[15px] leading-[1.8]">
              {product.productInfo}
            </p>
            <div className="my-6 flex items-center gap-3 rounded-xl p-4.5 text-[13px] bg-gray-100 dark:bg-gray-700 [&_svg]:shrink-0 [&_svg]:text-blue-600 dark:[&_svg]:text-blue-400 [&_p]:mt-o.75">
              <Truck size={21} />
              <div>
                <strong>Free delivery</strong>
                <p className="text-gray-500 dark:text-gray-400">
                  Delivery address added at checkout
                </p>
              </div>
            </div>
            <div className="my-6 flex items-center justify-between text-sm">
              <span>Quantity</span>
              <QuantityControl
                quantity={quantity}
                onChange={(value) => {
                  setQuantity(value);
                  setAdded(false);
                }}
                name={product.productName}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="min-h-12 px-4.5 py-3 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                onClick={() => {
                  addCart(product, quantity);
                  setAdded(true);
                }}
              >
                <ShoppingBag size={18} /> Add to cart
              </button>
              <button
                className="min-h-12 px-4.5 py-3 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-center bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-900"
                onClick={() =>
                  navigate("/card/orderSucces/customerInfo", {
                    state: { buyNow: { ...product, quantity } },
                  })
                }
              >
                Buy now <ArrowRight size={18} />
              </button>
            </div>
            <p
              className="min-h-11 pt-3.5 text-[13px] text-blue-600 dark:text-blue-400 [&_a]:underline"
              role="status"
            >
              {added && (
                <>
                  <span>Added to your cart. </span>
                  <Link to="/card">View cart →</Link>
                </>
              )}
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
