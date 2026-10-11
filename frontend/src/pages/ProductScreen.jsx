import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../redux/slices/productSlice.js";
import { ArrowLeft } from "lucide-react";

function ProductScreen() {
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(detailsProduct(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        navigate("/cart/" + id + "?qty=" + qty);
    };

    return (
        <div>
            <div className="p-2 pl-4">
                <Link to="/">
                    <ArrowLeft size={30} aria-hidden="true" className="text-black transition-colors duration-300 hover:text-gold" />
                </Link>
            </div>
            {loading ? (
                <div className="p-8 text-center text-xl">Loading...</div>
            ) : error ? (
                <div className="p-8 text-center text-xl text-red-600">{error}</div>
            ) : (
                <div className="relative flex min-h-screen min-w-0 flex-wrap content-start items-start gap-y-6 p-4 text-base sm:text-lg">
                    <div className="flex min-w-0 max-w-full flex-[1_1_30rem] items-center justify-center">
                        <img
                            className="h-auto w-4/5 max-w-lg object-contain transition-all duration-500 hover:max-w-xl"
                            src={product.image}
                            alt="product"
                        ></img>
                    </div>
                    <div className="h-full min-w-0 max-w-full flex-[1_1_30rem] px-0 sm:px-8 lg:px-24">
                        <ul className="list-none p-0">
                            <li className="my-4">
                                <h4>{product.brand}</h4>
                            </li>
                            <li className="my-4">
                                <h1 className="font-vollkorn text-2xl sm:text-3xl">{product.name}</h1>
                            </li>
                            <li className="my-4 mt-8 text-lg sm:mt-20 sm:text-xl">
                                {product.rating} Stars ({product.numReviews}{" "}
                                Reviews)
                            </li>
                            <li className="mb-8 my-4 text-base sm:mb-16 text-gray-600">
                                ₹<b>{Number(product.price).toLocaleString("en-IN")}</b>
                            </li>
                            <li className="my-4">
                                <div>{product.description}</div>
                            </li>
                            <li className="my-4 mt-8 text-sm text-gray-600">
                                Net Qty :
                                <select
                                    value={qty}
                                    onChange={e => {
                                        setQty(e.target.value);
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
                                        onClick={handleAddToCart}
                                        className="cursor-pointer rounded-lg border-2 border-black bg-gold p-4 transition-colors duration-300 hover:bg-white"
                                    >
                                        Add to Cart
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
