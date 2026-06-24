import { Link } from "react-router-dom";
import { useState } from "react";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return <div className="font-mono text-sm text-[#D9542E]">You're on the list.</div>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setDone(true);
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-transparent border-b border-white/30 py-1 text-sm font-mono outline-none"
      />
      <button type="submit" className="font-mono text-xs uppercase tracking-wider self-start mt-1">
        Subscribe →
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#161512] text-[#F6F4EF] mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <span className="font-black text-2xl">
            APEX<span className="text-[#D9542E]">HUB</span>
          </span>
          <p className="font-mono text-xs opacity-60 mt-3 max-w-xs leading-relaxed">
            High-quality, unique pieces built for the climb. Made to last.
          </p>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-wider opacity-50 mb-3">Shop</div>
          <div className="flex flex-col gap-2 font-mono text-sm">
            <Link to="/shop" className="opacity-80 hover:opacity-100">All Products</Link>
            <Link to="/shop?filter=new" className="opacity-80 hover:opacity-100">New Arrivals</Link>
          </div>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-wider opacity-50 mb-3">Newsletter</div>
          <NewsletterForm />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 font-mono text-[11px] opacity-40 border-t border-white/10">
        © 2026 ApexHub — Portfolio demo project by Ziva
      </div>
    </footer>
  );
}