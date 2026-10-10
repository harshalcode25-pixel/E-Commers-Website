import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../redux/slices/userSlice.js";

function SigninScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const requestedRedirect = new URLSearchParams(location.search).get("redirect") || "/";
    const redirect = "/" + requestedRedirect.replace(/^\/+/, "");

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(signin(email, password));
    };
    return (
        <div className="flex min-h-[90vh] items-center justify-center">
            <form onSubmit={submitHandler}>
                <ul className="flex w-96 flex-col rounded-lg border-2 border-gray-100 p-8 list-none">
                    <li className="my-4">
                        <h2 className="text-2xl">Sign-In</h2>
                    </li>
                    <li className="my-4">
                        {loading && <div>Loading...</div>}
                        {error && <div className="text-red-600">{error}</div>}
                    </li>
                    <li className="my-4 flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={e => setEmail(e.target.value)}
                            className="rounded border border-gray-300 p-2"
                        ></input>
                    </li>
                    <li className="my-4 flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            className="rounded border border-gray-300 p-2"
                        ></input>
                    </li>
                    <li className="my-4">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg border-2 border-black bg-gold-light p-4 transition-colors duration-300 hover:bg-white"
                        >
                            Signin
                        </button>
                    </li>
                    <li className="my-4">New to ShopNow?</li>
                    <li className="my-4">
                        <Link
                            to={
                                redirect === "/"
                                    ? "/register"
                                    : "/register?redirect=" + encodeURIComponent(redirect)
                            }
                            className="block w-full cursor-pointer rounded-lg border-2 border-black bg-gray-100 p-4 text-center transition-colors duration-300 hover:bg-white"
                        >
                            Create your ShopNow account.
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
}
export default SigninScreen;
