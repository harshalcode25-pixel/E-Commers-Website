import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, ShoppingBag, ShoppingCart, MapPin, UserRound, Package, ShieldCheck } from "lucide-react";

const money = value => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
const panel = "min-w-0 rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 lg:p-7";

function DashboardScreen() {
    const userInfo = useSelector(state => state.userSignin.userInfo);
    const { cartItems, shipping } = useSelector(state => state.cart);

    if (!userInfo) return <Navigate to="/signin?redirect=dashboard" replace />;

    const user = userInfo.user || userInfo;
    const name = user.name || "Shopper";
    const count = cartItems.reduce((total, item) => total + Number(item.qty), 0);
    const subtotal = cartItems.reduce((total, item) => total + Number(item.qty) * Number(item.price), 0);

    return (
        <div className="min-h-screen bg-[#f7f7f2] text-stone-900">
            <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
                <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-3 text-sm text-stone-500 sm:mb-8">
                    <Link to="/" className="hover:text-black">ShopNow</Link><span aria-hidden="true">/</span><span aria-current="page">My dashboard</span>
                </nav>
                <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
                    <div className="min-w-0">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Your personal space</p>
                        <h1 className="font-playfair text-2xl font-semibold sm:text-3xl lg:text-4xl">Welcome back, {name.split(" ")[0]}.</h1>
                        <p className="mt-3 text-sm text-stone-600 sm:text-base">A little overview of your account and your next great find.</p>
                    </div>
                    <Link to="/" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-lg bg-stone-900 px-5 py-3 text-sm font-medium text-white hover:bg-stone-700">Continue shopping <ArrowRight size={17} /></Link>
                </div>

                <div className="grid gap-4 sm:gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
                    <aside className="min-w-0 space-y-3 lg:space-y-5">
                        <div className={panel}>
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eccd] text-lg font-semibold lg:mb-4 lg:h-14 lg:w-14 lg:text-xl">{name.slice(0, 1).toUpperCase()}</div>
                            <h2 className="font-semibold">{name}</h2>
                            <p className="mt-1 break-all text-sm text-stone-500">{user.email || "Email unavailable"}</p>
                            <div className="mt-5 border-t border-stone-100 pt-4 text-xs text-stone-500">ShopNow account</div>
                        </div>
                        <nav aria-label="Dashboard navigation" className="grid grid-cols-3 gap-2 text-xs lg:grid-cols-1 lg:text-sm [&_svg]:shrink-0">
                            <Link to="/dashboard" aria-current="page" className="flex min-h-11 flex-col items-center justify-center gap-2 rounded-lg bg-[#eee8d5] px-2 py-3 text-center font-semibold lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:text-left"><UserRound size={18} /> Account overview</Link>
                            <Link to="/cart" className="flex min-h-11 flex-col items-center justify-center gap-2 rounded-lg px-2 py-3 text-center hover:bg-white lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:text-left"><ShoppingCart size={18} /> Shopping cart</Link>
                            <Link to="/" className="flex min-h-11 flex-col items-center justify-center gap-2 rounded-lg px-2 py-3 text-center hover:bg-white lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:text-left"><ShoppingBag size={18} /> Explore the shop</Link>
                        </nav>
                    </aside>

                    <div className="min-w-0 space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                            {[
                                { icon: ShoppingBag, label: "Items in your cart", value: count, note: "Ready when you are" },
                                { icon: ShoppingCart, label: "Cart subtotal", value: money(subtotal), note: "Before shipping and tax" },
                                { icon: MapPin, label: "Checkout address", value: shipping.address ? "Added" : "Not added", note: "For your current checkout" },
                            ].map(({ icon: Icon, label, value, note }) => (
                                <div key={label} className={`${panel} last:col-span-2 sm:last:col-span-1`}>
                                    <Icon size={21} className="mb-4 text-[#9a7925]" />
                                    <p className="text-xs font-medium text-stone-500">{label}</p>
                                    <p className="mt-2 text-xl font-semibold lg:text-2xl">{value}</p>
                                    <p className="mt-2 text-xs text-stone-500">{note}</p>
                                </div>
                            ))}
                        </div>

                        <section className={panel} aria-labelledby="dashboard-cart">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-6 sm:gap-4">
                                <h2 id="dashboard-cart" className="text-lg font-semibold">Your shopping bag</h2>
                                <Link to="/cart" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:underline">View cart <ArrowRight size={16} /></Link>
                            </div>
                            {cartItems.length ? (
                                <ul className="divide-y divide-stone-100">
                                    {cartItems.slice(0, 3).map(item => (
                                        <li key={item.product} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4">
                                            <Link to={`/product/${item.product}`} className="row-span-2 rounded-lg bg-stone-50 p-2 sm:row-span-1"><img src={item.image} alt={item.name} className="h-12 w-12 object-contain sm:h-14 sm:w-14" /></Link>
                                            <div className="min-w-0 flex-1"><Link to={`/product/${item.product}`} className="text-sm font-medium hover:underline">{item.name}</Link><p className="mt-1 text-xs text-stone-500">Quantity: {item.qty}</p></div>
                                            <p className="col-start-2 text-sm font-semibold sm:col-start-3">{money(item.price * item.qty)}</p>
                                        </li>
                                    ))}
                                    {cartItems.length > 3 && <li className="pt-4 text-sm text-stone-500">+ {cartItems.length - 3} more products in your cart</li>}
                                </ul>
                            ) : (
                                <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50 px-4 py-10 text-center">
                                    <ShoppingBag className="mx-auto mb-3 text-stone-400" size={30} />
                                    <h3 className="font-medium">Your next favorite is waiting</h3>
                                    <p className="mt-2 text-sm text-stone-500">Add something you love and find it here.</p>
                                    <Link to="/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">Discover products <ArrowRight size={16} /></Link>
                                </div>
                            )}
                        </section>

                        <div className="grid min-w-0 gap-4 sm:gap-6 md:grid-cols-2">
                            <section className={panel} aria-labelledby="dashboard-profile">
                                <div className="mb-5 flex items-center gap-3"><ShieldCheck size={20} className="text-[#9a7925]" /><h2 id="dashboard-profile" className="font-semibold">Account details</h2></div>
                                <dl className="space-y-4 text-sm"><div><dt className="text-stone-500">Full name</dt><dd className="mt-1 font-medium">{name}</dd></div><div><dt className="text-stone-500">Email address</dt><dd className="mt-1 break-all font-medium">{user.email || "Email unavailable"}</dd></div></dl>
                            </section>
                            <section className={panel} aria-labelledby="dashboard-address">
                                <div className="mb-5 flex items-center gap-3"><MapPin size={20} className="text-[#9a7925]" /><h2 id="dashboard-address" className="font-semibold">Checkout shipping details</h2></div>
                                {shipping.address ? <address className="text-sm leading-7 not-italic text-stone-600">{shipping.address}<br />{shipping.city}, {shipping.postalCode}<br />{shipping.country}</address> : <p className="text-sm leading-6 text-stone-500">Your shipping address will appear here once you enter it during checkout.</p>}
                                <p className="mt-4 text-xs text-stone-500">Shipping details apply to this session.</p>
                            </section>
                        </div>
                        <div className="flex items-start gap-3 rounded-xl bg-[#eee8d5]/60 p-5 text-sm text-stone-600"><Package size={21} className="shrink-0" /><p><span className="font-semibold text-stone-800">Looking for past orders?</span> Order history is not available yet. You can review your current items in your shopping cart.</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardScreen;
