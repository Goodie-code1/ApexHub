import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const cart = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 text-center">
        <p className="font-mono text-sm opacity-60 mb-4">Product not found.</p>
        <Link to="/shop" className="font-mono text-xs uppercase">
          ← Back to shop
        </Link>
      </div>
    );
  }

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Select a size first.");
      return;
    }
    setError("");
    cart.addItem(product, selectedSize, qty);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <Link to="/shop" className="font-mono text-xs uppercase opacity-70 hover:opacity-100 mb-8 inline-block">
        ← Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="relative">
          {product.tag && (
            <span className="absolute top-0 right-0 bg-black text-[#F6F4EF] font-mono text-[10px] tracking-wider px-2.5 py-1 z-10">
              {product.tag}
            </span>
          )}
          <img
            src={product.img}
            alt={product.name}
            className="w-full aspect-[4/5] object-cover bg-[#EFEBE2]"
          />
        </div>

        <div>
          <div className="font-mono text-xs opacity-50 mb-2">
            {product.id} · {product.category}
          </div>
          <h1 className="font-black text-3xl md:text-4xl mb-3">{product.name}</h1>
          <div className="font-mono text-xl font-bold mb-5">${product.price}</div>
          <p className="text-sm leading-relaxed opacity-80 mb-6 max-w-md">{product.desc}</p>
          <div className="font-mono text-xs opacity-60 mb-6">Color: {product.color}</div>

          <div className="mb-6">
            <div className="font-mono text-xs uppercase tracking-wider mb-2">Size</div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                const sizeClass = isSelected ? "bg-black text-[#F6F4EF]" : "bg-transparent text-black";
                return (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setError("");
                    }}
                    className={"font-mono text-xs px-4 py-2 border border-black " + sizeClass}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <div className="font-mono text-xs uppercase tracking-wider mb-2">Quantity</div>
            <div className="flex items-center gap-3 font-mono">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 border border-black"
              >
                -
              </button>
              <span className="w-6 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-8 h-8 border border-black">
                +
              </button>
            </div>
          </div>

          {error && <div className="font-mono text-xs mb-4 text-[#D9542E]">{error}</div>}
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto px-10 py-3.5 font-black text-sm tracking-wide bg-[#D9542E] text-[#161512]"
          >
            ADD TO CART
          </button>
          <div className="mt-8 pt-6 font-mono text-xs opacity-50 leading-relaxed border-t border-dashed border-black/10">
            Free shipping on all orders · 30-day returns · Shipped from ApexHub fulfillment
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-black text-2xl mb-6">YOU MIGHT ALSO LIKE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}