import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-20">
      <div className="font-mono text-xs uppercase tracking-widest mb-4 opacity-50">
        About
      </div>
      <h1 className="font-black text-3xl md:text-4xl mb-6">BUILT FOR THE CLIMB.</h1>
      <p className="font-mono text-sm opacity-70 leading-relaxed mb-4">
        ApexHub is a demo storefront built to showcase frontend e-commerce
        development — product browsing, cart logic, and a full checkout flow,
        all running client-side.
      </p>
      <p className="font-mono text-sm opacity-70 leading-relaxed">
        No real payments are processed and no orders ship. It's a portfolio
        piece, not a real store.
      </p>
      <Link
        to="/shop"
        className="mt-8 font-black text-sm px-7 py-3 inline-block bg-black text-[#F6F4EF]"
      >
        BROWSE PRODUCTS
      </Link>
    </div>
  );
}