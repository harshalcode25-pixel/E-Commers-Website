import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


import HomeScreen from "./pages/HomeScreen";
import DashboardScreen from "./pages/DashboardScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import SigninScreen from "./pages/SigninScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProductsScreen from "./pages/ProductsScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import Footer from "./components/Footer";


function App() {
    return (
        <BrowserRouter>
            <div className="grid min-w-0 grid-rows-[auto_auto] lg:min-h-screen lg:grid-rows-[auto_1fr_auto]">
                <Navbar />

                <main className="relative min-w-0 lg:min-h-screen">
                    <Routes>
                        <Route path="/dashboard" element={<DashboardScreen />} />
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

            </div>
            <Footer />
             
        </BrowserRouter>

        
    );
}

export default App;
