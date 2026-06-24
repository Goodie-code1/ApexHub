import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Cart() {
  const cart = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">
      <h1 className="font-black text-3xl md:text-4xl mb-8">YOUR CART</h1>

      {cart.items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-mono text-sm opacity-60 mb-5">Your cart is empty.</p>
          <Link
            to="/shop"
            className="font-black text-sm px-7 py-3 inline-block bg-black text-[#F6F4EF]"
          >
            BROWSE PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 flex flex-col gap-6">
            {cart.items.map((item) => (
              <div
                key={item.id + item.size}
                className="flex gap-5 pb-6 border-b border-black/10"
              >
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="w-24 h-28 object-cover bg-[#EFEBE2]"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-bold text-sm">{item.product.name}</div>
                      <div className="font-mono text-xs opacity-50 mt-1">
                        {item.product.id} · SIZE {item.size}
                      </div>
                    </div>
                    <div className="font-mono text-sm font-bold">
                      ${(item.product.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 font-mono text-sm">
                    <button
                      onClick={() => cart.updateQty(item.id, item.size, item.qty - 1)}
                      className="w-7 h-7 border border-black"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => cart.updateQty(item.id, item.size, item.qty + 1)}
                      className="w-7 h-7 border border-black"
                    >
                      +
                    </button>
                    <button
                      onClick={() => cart.removeItem(item.id, item.size)}
                      className="ml-4 font-mono text-xs opacity-50 hover:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="font-mono text-sm h-fit p-6 bg-[#EFEBE2]">
            <div className="flex justify-between mb-2 opacity-70">
              <span>Subtotal</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 opacity-70">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between mb-5 font-bold text-base pt-3 border-t border-dashed border-black/10">
              <span>Total</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-3 font-black text-sm tracking-wide bg-[#D9542E] text-[#161512]"
            >
              CHECKOUT →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}