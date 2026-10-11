import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderScreen() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!shipping.address) {
            navigate("/shipping");
        } else if (!payment.paymentMethod) {
            navigate("/payment");
        }
    }, [shipping, payment, navigate]);

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {
        navigate("/");
        alert("Order placed successfully.");
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

            <div className="flex min-w-0 flex-wrap justify-between gap-y-4 p-3 sm:p-4">
                <div className="min-w-0 max-w-full flex-[3_1_60rem]">
                    <div className="mx-0 mb-4 mt-0 rounded-lg sm:mx-4 border border-gray-300 bg-[#fcfcfc] p-4">
                        <h3 className="text-xl">Shipping</h3>
                        <div>
                            {cart.shipping.address},{cart.shipping.city},
                            {cart.shipping.postalCode},{cart.shipping.country},
                        </div>
                    </div>
                    <div className="mx-0 my-4 rounded-lg sm:mx-4 border border-gray-300 bg-[#fcfcfc] p-4">
                        <h3 className="text-xl">Payment</h3>
                        <div>Payment Method : {cart.payment.paymentMethod}</div>
                    </div>
                    <div className="mx-0 my-4 rounded-lg sm:mx-4 border border-gray-300 bg-[#fcfcfc] p-4">
                        <ul className="list-none p-0 sm:p-4">
                            <li className="mb-4 flex flex-wrap justify-between gap-2 border-b border-gray-500 pb-4">
                                <h3 className="text-xl">Shopping Cart</h3>
                                <div>Price</div>
                            </li>
                            {cartItems.length === 0 ? (
                                <div>Cart is Empty.</div>
                            ) : (
                                cartItems.map(item => (
                                    <li
                                        key={item.product}
                                        className="mb-4 flex flex-wrap justify-between gap-2 border-b border-gray-500 pb-4"
                                    >
                                        <div className="w-16 shrink-0 sm:w-auto sm:flex-[1_1]">
                                            <img
                                                className="h-auto max-h-24 max-w-full object-contain sm:max-h-40 sm:max-w-40"
                                                src={item.image}
                                                alt="product"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-[1_1_8rem] sm:flex-[8_1]">
                                            <div>
                                                <Link
                                                    to={"/product/" + item.product}
                                                    className="text-black hover:text-gold"
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div>Quantity : {item.qty}</div>
                                        </div>
                                        <div className="ml-auto min-w-0 shrink-0 whitespace-nowrap text-right text-lg sm:text-2xl">
                                            ₹{Number(item.price).toLocaleString("en-IN")}
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
                <div className="min-w-0 max-w-full flex-[3_1_20rem] rounded-lg border border-gray-300 bg-[#fcfcfc] p-4">
                    <ul className="list-none p-0">
                        <li className="mb-4">
                            <button
                                className="w-full cursor-pointer rounded-lg border-2 border-black bg-gold-light p-4 transition-colors duration-300 hover:bg-white"
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </button>
                        </li>
                        <li className="mb-4">
                            <h3 className="text-xl">Order Summary</h3>
                        </li>
                        <li className="mb-4 flex flex-wrap justify-between gap-2">
                            <div>Items</div>
                            <div>₹{itemsPrice.toLocaleString("en-IN")}</div>
                        </li>
                        <li className="mb-4 flex flex-wrap justify-between gap-2">
                            <div>Shipping</div>
                            <div>₹{shippingPrice.toLocaleString("en-IN")}</div>
                        </li>
                        <li className="mb-4 flex flex-wrap justify-between gap-2">
                            <div>Tax</div>
                            <div>₹{taxPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </li>
                        <li className="flex flex-wrap justify-between gap-2 border-t border-gray-300 pt-2 text-lg sm:text-xl font-bold text-orange-600">
                            <div>Order Total</div>
                            <div>₹{totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrderScreen;
