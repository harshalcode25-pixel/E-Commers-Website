import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, CircleUserRound, Search, X, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/slices/userSlice.js";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const userInfo = useSelector(state => state.userSignin.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchHandler = event => {
        event.preventDefault();
        navigate(`/?search=${encodeURIComponent(search)}`);
    };

    return (
        <>
            <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2 bg-white px-2 py-2 shadow-[5px_0.1px_10px_rgba(212,175,55,0.8)]">
                <div className="flex items-center">
                    <button onClick={() => setMenuOpen(true)} className="p-2" aria-label="Open menu"><Menu size={32} /></button>
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-black">ShopNow</Link>
                </div>
                <form onSubmit={searchHandler} className="flex flex-1 items-center justify-center">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products" className="w-full max-w-md rounded-l border p-2" />
                    <button className="rounded-r bg-black p-2 text-white" aria-label="Search"><Search size={22} /></button>
                </form>
                <div className="flex items-center gap-6">
                    <Link to="/cart" className="hover:text-amber-300"><ShoppingCart size={30} /></Link>
                    <div className="relative flex items-center gap-2">
                        {userInfo && (
                            <span className="max-w-40 truncate font-medium" title={userInfo.name || userInfo.user?.name}>
                                {userInfo.name || userInfo.user?.name || userInfo.email}
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={() => userInfo ? setAccountMenuOpen(open => !open) : navigate("/signin")}
                            aria-label={userInfo ? "Account options" : "Sign in"}
                            aria-expanded={userInfo ? accountMenuOpen : undefined}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <CircleUserRound size={30} />
                        </button>
                        {userInfo && accountMenuOpen && (
                            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                                <div className="mb-3 border-b border-gray-200 pb-3">
                                    <div className="font-semibold">{userInfo.name || userInfo.user?.name || "Account"}</div>
                                    <div className="break-all text-sm text-gray-600">{userInfo.email || userInfo.user?.email}</div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        dispatch(signout());
                                        setAccountMenuOpen(false);
                                        navigate("/");
                                    }}
                                    className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-gray-100"
                                >
                                    <LogOut size={18} /> Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            {menuOpen && <div className="fixed inset-0 z-30 bg-black/40" onClick={() => setMenuOpen(false)} />}
            <aside className={`fixed top-0 left-0 z-40 h-full w-72 bg-black/95 p-4 text-white transition-transform duration-500 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button onClick={() => setMenuOpen(false)} className="float-right p-1" aria-label="Close menu"><X size={26} /></button>
                <h3 className="border-b border-white/40 py-4 text-2xl">Categories</h3>
                <p className="mt-6">Mens</p><p>Women</p><p>Unisex</p><p>Children</p>
            </aside>
        </>
    );
}

export default Navbar;
