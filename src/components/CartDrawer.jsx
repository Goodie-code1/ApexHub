import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

export default function CartDrawer() {
  const cart = useCart();
  const navigate = useNavigate();

  if (!cart.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => cart.setIsOpen(false)}
      ></div>

      <div className="relative w-full max-w-md h-full flex flex-col bg-[#F6F4EF] border-l-2 border-black">
        <div className="flex items-center justify-between px-6 py-5 border-b border-dashed border-black/10">
          <h2 className="font-black text-lg">YOUR CART</h2>
          <button
            onClick={() => cart.setIsOpen(false)}
            className="font-mono text-xs uppercase"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 font-mono">
          {cart.items.length === 0 ? (
            <div className="py-16 text-center opacity-60 text-sm">
              Nothing here yet. Go find something built for the trail.
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {cart.items.map((item) => (
                <div
                  key={item.id + item.size}
                  className="flex gap-4 pb-4 border-b border-dashed border-black/10"
                >
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex justify-between items-start">
                      <span className="font-bold uppercase">{item.product.name}</span>
                      <span>${item.product.price}</span>
                    </div>
                    <div className="opacity-60 mt-1">
                      SIZE {item.size} · {item.product.id}
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => cart.updateQty(item.id, item.size, item.qty - 1)}
                        className="w-6 h-6 border border-black flex items-center justify-center"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => cart.updateQty(item.id, item.size, item.qty + 1)}
                        className="w-6 h-6 border border-black flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => cart.removeItem(item.id, item.size)}
                        className="ml-auto opacity-50 hover:opacity-100"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="px-6 py-5 font-mono text-sm border-t border-dashed border-black/10">
            <div className="flex justify-between mb-1 opacity-70">
              <span>SUBTOTAL</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 opacity-70">
              <span>SHIPPING</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between mb-5 font-bold text-base">
              <span>TOTAL</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
<button
              onClick={() => {
                cart.setIsOpen(false);
                navigate("/checkout");
              }}
              className="w-full py-3 font-black text-sm tracking-wide bg-black text-[#F6F4EF]"
            >
              CHECKOUT →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}