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
  <div>
    <h3 className="mb-5 text-base font-semibold text-white">{title}</h3>
    <ul className="space-y-3">
      {links.map(({ label, to }) => (
        <li key={label}>
          <Link
            to={to}
            className="text-sm text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
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
    <footer className="bg-[#0b1220] text-slate-400">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-10 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1.1fr_1.6fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 text-white">
              <ShoppingCart className="h-9 w-9 text-indigo-500" strokeWidth={2} />
              <span className="text-3xl font-semibold tracking-tight">ShopNow</span>
            </Link>
            <p className="mt-4 text-base text-slate-300">Better Products. Happier You.</p>
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-slate-400">
              Discover amazing products at the best prices. Shop with confidence, enjoy fast
              delivery and easy returns.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/70 text-white transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
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
          <div>
            <h3 className="text-base font-semibold text-white">Subscribe to Our Newsletter</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Get the latest updates, offers and exclusive deals straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5 flex overflow-hidden rounded-lg">
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
                className="flex w-11 items-center justify-center bg-indigo-500 text-white transition-colors hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300"
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
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-indigo-300" />
                <a href="" className="hover:text-white">
                  support@shopnow.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-indigo-300" />
                <a href="tel:+919876543210" className="hover:text-white">
                  +91 8999 xxxxxx
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-indigo-300" />
                <span>Thane, Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-10">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>

          <ul className="flex items-center gap-3" aria-label="Accepted payment methods">
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
