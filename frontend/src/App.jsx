import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import SigninScreen from "./pages/SigninScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProductsScreen from "./pages/ProductsScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";


function App() {
    return (
        <BrowserRouter>
            <div className="grid min-h-screen grid-rows-[5rem_1fr_5rem]">
                <Navbar />

                <main className="relative min-h-[100vh]">
                    <Routes>
                        <Route path="/products" element={<ProductsScreen />} />
                        <Route path="/shipping" element={<ShippingScreen />} />
                        <Route path="/payment" element={<PaymentScreen />} />
                        <Route path="/placeorder" element={<PlaceOrderScreen />} />
                        <Route path="/signin" element={<SigninScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/product/:id" element={<ProductScreen />} />
                        <Route path="/cart/:id" element={<CartScreen />} />
                        <Route path="/cart" element={<CartScreen />} />
                        <Route path="/" element={<HomeScreen />} />
                    </Routes>
                </main>

                <footer className="flex items-center justify-center bg-white text-black shadow-[5px_0.1px_10px_rgba(212,175,55,0.8)]">
                    All right reserved
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
