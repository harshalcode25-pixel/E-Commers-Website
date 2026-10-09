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
                <ul className="flex flex-wrap items-center justify-center bg-[#f8f8f8] p-0">
                    {filteredProducts.map(product => (
                        <li
                            key={product._id}
                            className="m-4 h-[40rem] flex-[0_1_30rem] list-none bg-white p-0"
                        >
                            <div className="group flex h-full flex-col items-center justify-between m-2 transition-shadow duration-300 hover:shadow-[1px_1px_10px_#d4af37]">
                                <Link to={"/product/" + product._id}>
                                    <img
                                        className="max-h-96 max-w-96 transition-all duration-500 group-hover:max-h-[25rem] group-hover:max-w-[25rem]"
                                        src={product.image}
                                        alt="product"
                                    />
                                </Link>
                                <Link to={"/product/" + product._id}>
                                    <div className="text-center text-xl font-bold text-black transition-colors duration-300 hover:text-gold">
                                        {product.name}
                                    </div>
                                </Link>
                                <div className="text-sm text-gray-500">
                                    {product.brand}
                                </div>
                                <div className="mb-4 text-2xl font-bold">
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
