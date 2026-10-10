import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice.js";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

function CartScreen() {
    const { id: productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const qty = location.search
        ? Number(new URLSearchParams(location.search).get("qty"))
        : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = productId => {
        dispatch(removeFromCart(productId));
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    const checkoutHandler = () => {
        navigate("/signin?redirect=/shipping");
    };

    return (
        <div className="relative m-4 flex min-h-screen flex-wrap items-start">
            <div className="flex-[3_1_60rem]">
                <ul className="list-none p-4">
                    <li className="mb-4 flex items-end justify-between border-b border-gray-500 pb-4">
                        <h1 className="text-2xl">Your Cart</h1>
                        <div>Price</div>
                    </li>
                    {cartItems.length === 0 ? (
                        <div>
                            <h1 className="text-2xl">Cart is Empty.</h1>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <li
                                key={item.product}
                                className="mb-4 flex items-end justify-between border-b border-gray-500 pb-4"
                            >
                                <div className="flex-[1_1]">
                                    <img
                                        className="max-h-40 max-w-40"
                                        src={item.image}
                                        alt="product"
                                    />
                                </div>
                                <div className="flex-[8_1]">
                                    <div>
                                        <Link
                                            to={"/product/" + item.product}
                                            className="text-black hover:text-gold"
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Quantity :
                                        <select
                                            value={item.qty}
                                            onChange={e =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        e.target.value
                                                    )
                                                )
                                            }
                                            className="ml-2 mr-4 rounded border border-gray-300 p-1"
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFromCartHandler(item.product)
                                            }
                                            className="float-right mr-20 w-40 cursor-pointer rounded-lg border-2 border-black bg-gold p-1 transition-colors duration-300 hover:bg-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-[1_1] text-right text-2xl">
                                    ₹{Number(item.price).toLocaleString("en-IN")}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="flex-[1_1_20rem] rounded-lg bg-[#f8f8f8] p-4">
                <h3 className="text-xl">
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    : ₹{cartItems.reduce((a, c) => a + c.price * c.qty, 0).toLocaleString("en-IN")}
                </h3>
                <button
                    className="w-full cursor-pointer rounded-lg border-2 border-black bg-gold-light p-4 transition-colors duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default CartScreen;
