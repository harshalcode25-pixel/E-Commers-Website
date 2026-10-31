import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../redux/slices/productSlice.js";
import { addToCart } from "../redux/slices/cartSlice.js";
import { ArrowLeft } from "lucide-react";

function ProductScreen() {
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(detailsProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (!added) return;
        const timer = setTimeout(() => {
            setAdded(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [added]);

    const handleAddToCart = () => {
        dispatch(addToCart({ productId: id, qty: Number(qty) }));
        setAdded(true);
    };

    const handleBack = () => {
        if (window.history.state?.idx > 0) {
            navigate(-1);
        } else {
            navigate("/", { replace: true });
        }
    };

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
            <div className="mb-5">
                <button type="button" onClick={handleBack} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                    <ArrowLeft size={20} aria-hidden="true" />
                    Back
                </button>
            </div>
            {loading ? (
                <div className="p-8 text-center text-xl">Loading...</div>
            ) : error ? (
                <div className="p-8 text-center text-xl text-red-600">{error}</div>
            ) : (
                <div className="grid min-w-0 items-start gap-6 text-base md:grid-cols-2 md:gap-10 lg:gap-14">
                    <div className="flex h-72 min-w-0 items-center justify-center overflow-hidden rounded-xl bg-stone-50 p-5 sm:h-96 md:h-[28rem]">
                        <img
                            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                            src={product.image}
                            alt={product.name}
                        ></img>
                    </div>
                    <div className="min-w-0">
                        <ul className="list-none p-0">
                            <li className="mb-3 text-sm text-gray-500">
                                <h4>{product.brand}</h4>
                            </li>
                            <li className="my-4">
                                <h1 className="font-vollkorn text-2xl sm:text-3xl">{product.name}</h1>
                            </li>
                            <li className="my-4 text-sm text-gray-600">
                                {product.rating} Stars ({product.numReviews}{" "}
                                Reviews)
                            </li>
                            <li className="my-5 text-2xl text-gray-900">
                                ₹<b>{Number(product.price).toLocaleString("en-IN")}</b>
                            </li>
                            <li className="my-5 leading-relaxed text-gray-600">
                                <div>{product.description}</div>
                            </li>
                            <li className="my-5 text-sm text-gray-600">
                                Net Qty :
                                <select
                                    value={qty}
                                    onChange={e => {
                                        setQty(Number(e.target.value));
                                    }}
                                    className="ml-2 rounded border border-gray-300 p-1"
                                >
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </li>
                            <li className="my-4">
                                {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                            </li>
                            <li className="my-4 flex flex-col">
                                {product.countInStock > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        className="cursor-pointer rounded-lg border-2 border-black bg-gold p-4 transition-colors duration-300 hover:bg-white"
                                    >
                                        {added ? "✓ Added to Cart" : "Add to Cart"}
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ProductScreen;
