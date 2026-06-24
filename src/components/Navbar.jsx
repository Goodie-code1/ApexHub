import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { useState } from "react";

export default function Navbar() {
  const cart = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Shop", path: "/shop" },
    { label: "New Arrivals", path: "/shop?filter=new" },
    { label: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#F6F4EFeb] border-b border-black/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-black text-xl tracking-tight">
          APEX<span className="text-[#D9542E]">HUB</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider">
          {links.map((l) => (
            <Link key={l.path} to={l.path} className="opacity-80 hover:opacity-100">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => cart.setIsOpen(true)}
            className="relative font-mono text-xs uppercase tracking-wider flex items-center gap-2 border border-black px-3 py-2"
          >
            Cart
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] bg-[#D9542E] text-[#F6F4EF]">
              {cart.itemCount}
            </span>
          </button>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className="w-6 flex flex-col gap-1.5">
              <span className="h-[2px] w-full bg-black"></span>
              <span className="h-[2px] w-full bg-black"></span>
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-4 font-mono text-sm uppercase tracking-wider border-t border-black/10">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className="pt-3"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}