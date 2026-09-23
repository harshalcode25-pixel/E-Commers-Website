import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import QuantityControl from "../Components/QuantityControl";
import { ProductDataContext } from "../Context/ProductContext";

export default function AddCart() {
  const { cart, removeCart, updateQuantity } = useContext(ProductDataContext);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0,
  );
  const money = (value) => `₹${value.toLocaleString("en-IN")}`;
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900"><Navbar /></div>
      <main className="mx-auto w-full max-w-6xl px-3 sm:px-6 pt-6 pb-36 sm:pb-10">
        <Link
          className="mb-5 inline-flex min-h-11 items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          to="/"
        >
          <ArrowLeft size={16} /> Continue shopping
        </Link>
        <div className="mb-5 sm:mb-7 flex items-center justify-between gap-2 sm:gap-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-xs font-bold tracking-widest uppercase">
              YOUR GOOD FINDS
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              My cart{" "}
              <span className="ml-1.5 inline-flex h-8 min-w-8 items-center justify-center rounded-xl align-middle text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900">
                {count}
              </span>
            </h1>
          </div>
          <ShoppingBag className="text-gray-500 dark:text-gray-400" />
        </div>
        {!cart.length ? (
          <section className="flex flex-col items-center gap-5 px-5 py-15 text-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl">
            <ShoppingBag size={48} />
            <h2 className="my-2 text-2xl font-bold">Your cart is waiting</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Discover something you love and add it here.
            </p>
            <Link
              to="/"
              className="min-h-12 px-5 py-3 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-center bg-blue-700 text-white hover:bg-gray-800 dark:hover:bg-gray-900"
            >
              Explore products <ArrowRight size={18} />
            </Link>
          </section>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
              <section
                className="flex min-w-0 flex-col gap-3.5"
                aria-label="Cart products"
              >
                {cart.map((item) => (
                  <article
                    className="relative flex gap-3 sm:gap-5 px-3 py-3.5 sm:p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl sm:rounded-xl"
                    key={item.id}
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="w-19 sm:w-30 shrink-0"
                    >
                      <img className="h-24 w-full rounded-xl object-cover sm:h-32" src={item.img} alt={item.productName} />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-xs font-bold tracking-widest uppercase">
                        {item.category}
                      </span>
                      <Link to={`/product/${item.id}`}>
                        <h2 className="my-1 pr-6 text-sm font-semibold sm:text-base">{item.productName}</h2>
                      </Link>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {money(item.productPrice)} each
                      </p>
                      <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                        <QuantityControl
                          name={item.productName}
                          quantity={item.quantity}
                          onChange={(value) => updateQuantity(item.id, value)}
                        />
                        <strong className="whitespace-nowrap text-sm sm:text-base">
                          {money(item.productPrice * item.quantity)}
                        </strong>
                      </div>
                    </div>
                    <button
                      className="absolute right-2 top-2 grid size-11 place-items-center text-gray-500 dark:text-gray-400 hover:text-red-500"
                      aria-label={`Remove ${item.productName} from cart`}
                      onClick={() => removeCart(item.id)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </article>
                ))}
                <div className="flex items-center gap-3 rounded-xl p-3 text-sm bg-gray-100 dark:bg-gray-700 sm:my-6 sm:p-5">
                  <Truck className="shrink-0 text-blue-600 dark:text-blue-400" size={20} />
                  <span>Free delivery on your order</span>
                </div>
              </section>
              <aside className="p-5 sm:p-7 lg:sticky lg:top-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl">
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-xs font-bold tracking-widest uppercase">
                  THE FINAL DETAILS
                </p>
                <h2 className="my-2 text-2xl font-bold">Order summary</h2>
                <div className="mt-5 flex justify-between gap-3 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Subtotal ({count} {count === 1 ? "item" : "items"})
                  </span>
                  <span>{money(total)}</span>
                </div>
                <div className="mt-5 flex justify-between gap-3 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Delivery
                  </span>
                  <span className="font-semibold text-green-700 dark:text-emerald-400">
                    Free
                  </span>
                </div>
                <div className="my-6 flex justify-between gap-3 border-t border-gray-200 dark:border-gray-700 pt-6 text-xl">
                  <strong>Total</strong>
                  <strong className="text-lg">{money(total)}</strong>
                </div>
                <Link
                  className="min-h-12 px-5 py-3 hidden sm:inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-center w-full bg-blue-700 text-white hover:bg-gray-800 dark:hover:bg-gray-900"
                  to="/card/orderSucces/customerInfo"
                >
                  Continue to checkout <ArrowRight size={18} />
                </Link>
                <p className="text-gray-500 dark:text-gray-400 mt-3.5 text-center text-xs leading-relaxed">
                  Review your delivery details in the next step.
                </p>
              </aside>
            </div>
            <div className="fixed inset-x-0 bottom-0 z-30 flex sm:hidden items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 pt-3.5 pb-8 shadow-lg">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 dark:text-gray-400">
                  Total · {count} items
                </span>
                <strong>{money(total)}</strong>
              </div>
              <Link
                className="min-h-12 px-5 py-3 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-center bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-900"
                to="/card/orderSucces/customerInfo"
              >
                Checkout <ArrowRight size={17} />
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
