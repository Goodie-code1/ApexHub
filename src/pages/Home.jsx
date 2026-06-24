import { Link } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.tag === "BEST SELLER");
  const newArrivals = PRODUCTS.filter((p) => p.tag === "NEW");

  return (
    <div>
      <section className="bg-[#161512] text-[#F6F4EF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest mb-4 text-[#D9542E]">
              FW26 COLLECTION — DROP 01
            </div>
            <h1 className="font-black text-5xl md:text-7xl leading-[0.95] tracking-tight">
              BUILT FOR 
              <br />
              THE ASCENT.
            </h1>
            <p className="font-mono text-sm opacity-60 mt-5 max-w-sm leading-relaxed">
              Various simple but unique pieces made to last. High quality and fair pricing guaranteed.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-3 px-7 py-3 font-black text-sm tracking-wide bg-[#D9542E] text-[#161512]"
            >
             EXPLORE THE COLLECTION →
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=80"
              alt="Ridgeline Shell Jacket"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-4 -left-4 font-mono text-xs px-3 py-2 bg-[#D9542E] text-[#161512]">
              AH-1001 · RIDGELINE SHELL
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <h2 className="font-black text-2xl mb-6">SHOP BY CATEGORY</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.filter((c) => c !== "All").map((cat) => (
            <Link
              key={cat}
              to={"/shop?category=" + cat}
              className="font-mono text-xs uppercase tracking-wider px-4 py-2 whitespace-nowrap border border-black hover:bg-black hover:text-[#F6F4EF] transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-black text-2xl">BEST SELLERS</h2>
          <Link to="/shop" className="font-mono text-xs uppercase opacity-70 hover:opacity-100">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-black text-2xl">NEW ARRIVALS</h2>
          <Link to="/shop?filter=new" className="font-mono text-xs uppercase opacity-70 hover:opacity-100">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-px bg-black/10 font-mono text-xs uppercase tracking-wider">
          {[
            { label: "Free shipping", desc: "On every order, no minimum" },
            { label: "30-day returns", desc: "Unworn gear, full refund" },
            { label: "Built to last", desc: "Field-tested before it ships" },
          ].map((b) => (
            <div key={b.label} className="p-6 bg-[#F6F4EF]">
              <div className="font-bold mb-1">{b.label}</div>
              <div className="opacity-60">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}