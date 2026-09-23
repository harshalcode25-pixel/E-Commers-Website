import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function OrderSuccess() {
  const dialog = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);

  const finish = () => navigate("/card", { replace: true });

  return (
    <dialog
      ref={dialog}
      aria-labelledby="order-success-title"
      aria-describedby="order-success-description"
      onCancel={(event) => {
        event.preventDefault();
        finish();
      }}
      className="fixed inset-0 m-auto w-11/12 max-w-sm translate-y-0 scale-100 rounded-2xl border-0 bg-white p-5 text-center opacity-100 shadow-2xl transition duration-500 ease-out backdrop:bg-black/40 backdrop:backdrop-blur-sm backdrop:transition-opacity backdrop:duration-500 motion-reduce:transition-none sm:p-7 dark:bg-gray-800"
    >
      <div className="mx-auto mb-5 flex size-20 scale-100 items-center justify-center rounded-full bg-green-100 opacity-100 transition delay-150 duration-500 ease-out motion-reduce:transition-none">
        <div className="flex size-14 items-center justify-center rounded-full bg-green-500">
          <Check
            className="size-8 text-white"
            strokeWidth={3}
            aria-hidden="true"
          />
        </div>
      </div>
      <h2
        id="order-success-title"
        className="text-2xl font-bold text-gray-800 dark:text-gray-100"
      >
        Order Successful!
      </h2>
      <p
        id="order-success-description"
        className="mt-2 text-gray-500 dark:text-gray-300"
      >
        Your order has been placed successfully.
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Thank you for shopping with us!
      </p>
      <button
        autoFocus
        type="button"
        onClick={finish}
        className="mt-6 min-h-12 w-full rounded-lg bg-linear-to-r from-green-500 to-emerald-600 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg motion-reduce:transition-none"
      >
        Done
      </button>
    </dialog>
  );
}
