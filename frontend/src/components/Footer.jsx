import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Mail, Phone, MapPin, ArrowRight, MessageCircle, Camera, AtSign, Play, Pin, CreditCard, Wallet } from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Deals", to: "/deals" },
];

const customerService = [
  { label: "Contact Us", to: "/contact" },
  { label: "FAQs", to: "/faqs" },
  { label: "Shipping Policy", to: "/shipping-policy" },
  { label: "Return & Refund Policy", to: "/returns" },
  { label: "Track Your Order", to: "/track-order" },
  { label: "Size Guide", to: "/size-guide" },
];

const aboutUs = [
  { label: "Our Story", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "Press", to: "/press" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: MessageCircle },
  { label: "Instagram", href: "https://instagram.com", Icon: Camera },
  { label: "X", href: "https://x.com", Icon: AtSign },
  { label: "YouTube", href: "https://youtube.com", Icon: Play },
  { label: "Pinterest", href: "https://pinterest.com", Icon: Pin },
];

const LinkColumn = ({ title, links }) => (
  <div className="min-w-0">
    <h3 className="mb-4 text-sm font-semibold text-white sm:text-base">{title}</h3>
    <ul className="space-y-3">
      {links.map(({ label, to }) => (
        <li key={label}>
          <Link
            to={to}
            className="inline-flex min-h-9 items-center wrap-break-word text-sm text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("Newsletter signup is currently unavailable. Please contact us by email.");
  };

  return (
    <footer className="flex min-h-75 flex-col bg-[#0b1220] text-slate-400 sm:block sm:min-h-0">
      <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-6 sm:hidden">
        <Link to="/" className="mx-auto flex w-fit items-center gap-2 text-white">
          <ShoppingCart className="h-5 w-5 text-indigo-500" aria-hidden="true" />
          <span className="text-lg font-semibold leading-6">ShopNow</span>
        </Link>
        <nav aria-label="Footer navigation" className="mx-auto mt-3 grid w-full max-w-sm grid-cols-2 gap-x-3 min-[375px]:gap-x-5">
          {[
            { label: "Shop", to: "/products" },
            { label: "About Us", to: "/about" },
            { label: "Contact Us", to: "/contact" },
            { label: "FAQs", to: "/faqs" },
            { label: "Categories", to: "/categories" },
            { label: "Deals", to: "/deals" },
            { label: "Track Your Order", to: "/track-order" },
            { label: "Shipping Policy", to: "/shipping-policy" },
            { label: "Returns & Refunds", to: "/returns" },
            { label: "Privacy Policy", to: "/privacy" },
          ].map(({ label, to }) => (
            <Link key={to} to={to} className="inline-flex min-h-8 min-w-0 items-center justify-center wrap-break-word text-center text-xs hover:text-white focus-visible:outline-2 focus-visible:outline-indigo-400">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto hidden max-w-7xl px-4 pt-10 pb-8 sm:block sm:px-6 sm:pt-12 sm:pb-10 lg:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,1.6fr)] xl:gap-6 2xl:gap-10">
          {/* Brand */}
          <div className="col-span-2 min-w-0 sm:col-span-3 xl:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-white">
              <ShoppingCart className="h-9 w-9 text-indigo-500" strokeWidth={2} />
              <span className="text-3xl font-semibold tracking-tight">ShopNow</span>
            </Link>
            <p className="mt-4 text-base text-slate-300">Better Products. Happier You.</p>
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-slate-400">
              Discover amazing products at the best prices. Shop with confidence, enjoy fast
              delivery and easy returns.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-800/70 text-white transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Quick Links" links={quickLinks} />
          <LinkColumn title="Customer Service" links={customerService} />
          <LinkColumn title="About Us" links={aboutUs} />

          {/* Newsletter + contact */}
          <div className="col-span-2 min-w-0 border-t border-slate-800 pt-8 sm:col-span-3 xl:col-span-1 xl:border-t-0 xl:pt-0">
            <h3 className="text-base font-semibold text-white">Subscribe to Our Newsletter</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Get the latest updates, offers and exclusive deals straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5 flex w-full max-w-md overflow-hidden rounded-lg">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                required
                className="min-w-0 flex-1 bg-slate-800/60 px-3 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex min-h-11 w-11 shrink-0 items-center justify-center bg-indigo-500 text-white transition-colors hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-300"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
            {status && (
              <p role="status" className="mt-2 text-xs text-slate-300">
                {status}
              </p>
            )}

            <h3 className="mt-8 mb-4 text-base font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm [&_svg]:shrink-0 [&_a]:min-w-0 [&_a]:wrap-break-word">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-indigo-300" />
                <a href="mailto:support@shopnow.com" className="hover:text-white">
                  support@shopnow.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-indigo-300" />
                <a href="tel:+919876543210" className="hover:text-white">
                  +91 8999 xxxxxx
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-indigo-300" />
                <span>Thane, Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 bg-[#0b1220] py-3 text-sm text-slate-400 sm:py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 sm:gap-4 sm:px-6 sm:py-2 md:flex-row md:justify-between lg:px-10">
          <p className="text-center text-xs text-slate-400 sm:text-sm md:text-left">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
  
          <ul className="flex flex-wrap items-center justify-center gap-3" aria-label="Accepted payment methods">
            <li className="flex h-7 w-10 items-center justify-center rounded bg-white ring-2 ring-blue-600">
              <CreditCard className="h-5 w-6 text-blue-800" aria-hidden="true" /><span className="sr-only">Visa</span>
            </li>
            <li className="flex h-7 w-10 items-center justify-center rounded bg-white">
              <CreditCard className="h-5 w-6 text-orange-500" aria-hidden="true" /><span className="sr-only">Mastercard</span>
            </li>
            <li className="flex h-7 w-10 items-center justify-center rounded bg-white text-[10px] font-bold italic text-slate-600">
              UPI
            </li>
            <li className="flex h-7 w-10 items-center justify-center rounded bg-white">
              <Wallet className="h-5 w-6 text-blue-700" aria-hidden="true" /><span className="sr-only">PayPal</span>
            </li>
            <li className="flex h-7 w-10 items-center justify-center rounded bg-white text-[10px] font-semibold text-slate-700">
              G Pay
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
