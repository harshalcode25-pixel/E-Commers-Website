import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShipping } from "../redux/slices/cartSlice.js";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country }));
        navigate("/payment");
    };
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="flex min-h-[90vh] items-center justify-center">
                <form onSubmit={submitHandler}>
                    <ul className="flex w-96 flex-col rounded-lg border-2 border-gray-100 p-8 list-none">
                        <li className="my-4">
                            <h2 className="text-2xl">Shipping</h2>
                        </li>
                        <li className="my-4 flex flex-col">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                required
                                onChange={e => setAddress(e.target.value)}
                                className="rounded border border-gray-300 p-2"
                            ></input>
                        </li>
                        <li className="my-4 flex flex-col">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                required
                                onChange={e => setCity(e.target.value)}
                                className="rounded border border-gray-300 p-2"
                            ></input>
                        </li>
                        <li className="my-4 flex flex-col">
                            <label htmlFor="postalCode">PIN Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                id="postalCode"
                                inputMode="numeric"
                                autoComplete="postal-code"
                                pattern="[1-9][0-9]{5}"
                                maxLength={6}
                                title="Enter a valid 6-digit PIN code"
                                required
                                onChange={e => setPostalCode(e.target.value)}
                                className="rounded border border-gray-300 p-2"
                            ></input>
                        </li>
                        <li className="my-4 flex flex-col">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                required
                                onChange={e => setCountry(e.target.value)}
                                className="rounded border border-gray-300 p-2"
                            ></input>
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
export default ShippingScreen;
