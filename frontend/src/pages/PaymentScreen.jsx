import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePayment } from "../redux/slices/cartSlice.js";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        navigate("/placeorder");
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="flex min-h-[90vh] items-center justify-center">
                <form onSubmit={submitHandler}>
                    <ul className="flex w-96 flex-col rounded-lg border-2 border-gray-100 p-8 list-none">
                        <li className="my-4">
                            <h2 className="text-2xl">Payment</h2>
                        </li>
                        <li className="my-4 flex flex-col">
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="paymentMethod"
                                onChange={e => setPaymentMethod(e.target.value)}
                                value="paypal"
                                className="mb-2 w-fit"
                            ></input>
                            <label htmlFor="paymentMethod">Paypal</label>
                        </li>
                        <li className="my-4">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-lg border-2 border-black bg-gold-light p-4 transition-colors duration-300 hover:bg-white"
                            >
                                Continue
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}
export default PaymentScreen;
