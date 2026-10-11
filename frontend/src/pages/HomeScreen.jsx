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
                <ul className="grid grid-cols-2 items-stretch gap-2 bg-[#f8f8f8] p-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-0 sm:p-0">
                    {filteredProducts.map(product => (
                        <li
                            key={product._id}
                            className="min-w-0 list-none bg-white p-0 sm:m-4 sm:h-[40rem] sm:max-w-[calc(100%-2rem)] sm:flex-[0_1_30rem]"
                        >
                            <div className="group m-2 flex h-[calc(100%-1rem)] min-w-0 flex-col items-center justify-between gap-3 py-3 sm:h-full sm:gap-0 sm:py-0 transition-shadow duration-300 hover:shadow-[1px_1px_10px_#d4af37] max-sm:active:shadow-[1px_1px_10px_#d4af37]">
                                <Link to={"/product/" + product._id} className="min-w-0 max-w-full">
                                    <img
                                        className="h-auto max-h-44 max-w-full object-contain transition-all duration-500 max-sm:group-hover:scale-105 max-sm:group-active:scale-105 sm:max-h-96 sm:max-w-96 sm:group-hover:max-h-[25rem] sm:group-hover:max-w-[25rem]"
                                        src={product.image}
                                        alt="product"
                                    />
                                </Link>
                                <Link to={"/product/" + product._id} className="min-w-0 max-w-full">
                                    <div className="text-center text-sm font-bold text-black transition-colors duration-300 hover:text-gold min-[425px]:text-base sm:text-xl">
                                        {product.name}
                                    </div>
                                </Link>
                                <div className="max-w-full text-center text-xs text-gray-500 sm:text-sm">
                                    {product.brand}
                                </div>
                                <div className="mb-2 max-w-full text-center text-sm font-bold min-[425px]:text-base sm:mb-4 sm:text-2xl">
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
