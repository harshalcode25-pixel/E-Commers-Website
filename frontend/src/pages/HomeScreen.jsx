import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/slices/productSlice.js";

import Corousel from "../components/Corousel";

function HomeScreen() {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const search = (searchParams.get("search") || "").toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            <Corousel />
            {loading ? (
                <div className="p-8 text-center text-xl">loading...</div>
            ) : error ? (
                <div className="p-8 text-center text-xl text-red-600">{error}</div>
            ) : (
                <ul className="grid grid-cols-3 items-stretch gap-2 bg-[#f8f8f8] p-2 sm:gap-4 sm:p-4 lg:gap-6 lg:p-6">
                    {filteredProducts.map(product => (
                        <li
                            key={product._id}
                            className="min-w-0 list-none bg-white p-0"
                        >
                            <div className="group m-1 flex h-[calc(100%-0.5rem)] min-w-0 flex-col items-center justify-between gap-2 py-2 sm:m-2 sm:h-[calc(100%-1rem)] sm:gap-3 sm:py-3 transition-shadow duration-300 hover:shadow-[1px_1px_10px_#d4af37] max-sm:active:shadow-[1px_1px_10px_#d4af37]">
                                <Link to={"/product/" + product._id} className="flex h-28 w-full min-w-0 items-center justify-center overflow-hidden sm:h-48 lg:h-72">
                                    <img
                                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </Link>
                                <Link to={"/product/" + product._id} className="min-w-0 max-w-full">
                                    <div className="text-center text-xs font-bold text-black transition-colors duration-300 hover:text-gold sm:text-base lg:text-xl">
                                        {product.name}
                                    </div>
                                </Link>
                                <div className="max-w-full text-center text-xs text-gray-500 sm:text-sm">
                                    {product.brand}
                                </div>
                                <div className="mb-2 max-w-full text-center text-xs font-bold sm:mb-4 sm:text-lg lg:text-2xl">
                                    ₹{Number(product.price).toLocaleString("en-IN")}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HomeScreen;
