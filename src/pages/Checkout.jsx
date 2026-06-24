import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});

  if (cart.items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-20 text-center">
        <p className="font-mono text-sm opacity-60 mb-5">
          Your cart is empty — nothing to check out.
        </p>
        <Link
          to="/shop"
          className="font-black text-sm px-7 py-3 inline-block bg-black text-[#F6F4EF]"
        >
          BROWSE PRODUCTS
        </Link>
      </div>
    );
  }

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    if (!/^\d{13,19}$/.test(form.card.replace(/\s/g, ""))) e.card = "Enter a valid card number";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "Invalid";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length === 0) {
      cart.clearCart();
      navigate("/confirmation");
    }
  };

  const inputClass = "w-full font-mono text-sm px-3 py-2.5 border bg-transparent outline-none";

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-12">
      <h1 className="font-black text-3xl md:text-4xl mb-8">CHECKOUT</h1>
      <div className="grid md:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="md:col-span-2 flex flex-col gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider mb-3 opacity-70">
              Shipping Info
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <input
                  placeholder="Full name"
                  value={form.name}
                  onChange={update("name")}
                  className={inputClass}
                  style={{ borderColor: errors.name ? "#D9542E" : "black" }}
                />
                {errors.name && (
                  <p className="font-mono text-xs mt-1 text-[#D9542E]">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={update("email")}
                  className={inputClass}
                  style={{ borderColor: errors.email ? "#D9542E" : "black" }}
                />
                {errors.email && (
                  <p className="font-mono text-xs mt-1 text-[#D9542E]">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Street address"
                  value={form.address}
                  onChange={update("address")}
                  className={inputClass}
                  style={{ borderColor: errors.address ? "#D9542E" : "black" }}
                />
                {errors.address && (
                  <p className="font-mono text-xs mt-1 text-[#D9542E]">{errors.address}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                  placeholder="City"
                    value={form.city}
                    onChange={update("city")}
                    className={inputClass}
                    style={{ borderColor: errors.city ? "#D9542E" : "black" }}
                  />
                  {errors.city && (
                    <p className="font-mono text-xs mt-1 text-[#D9542E]">{errors.city}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="ZIP / Postal code"
                    value={form.zip}
                    onChange={update("zip")}
                    className={inputClass}
                    style={{ borderColor: errors.zip ? "#D9542E" : "black" }}
                  />
                  {errors.zip && (
                    <p className="font-mono text-xs mt-1 text-[#D9542E]">{errors.zip}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-wider mb-3 opacity-70">
              Payment (Demo only — no real charge)
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <input
                  placeholder="Card number"
                  value={form.card}
                  onChange={update("card")}
                  className={inputClass}
                  style={{ borderColor: errors.card ? "#D9542E" : "black" }}
                />
                {errors.card && (
                  <p className="font-mono text-xs mt-1 text-[#D9542E]">{errors.card}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={update("expiry")}
                    className={inputClass}
                    style={{ borderColor: errors.expiry ? "#D9542E" : "black" }}
                  />
                  {errors.expiry && (
                    <p className="font-mono text-xs mt-1 text-[#D9542E]">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="CVC"
                    value={form.cvc}
                    onChange={update("cvc")}
                    className={inputClass}
                    style={{ borderColor: errors.cvc ? "#D9542E" : "black" }}
                  />
                  {errors.cvc && (
                    <p className="font-mono text-xs mt-1 text-[#D9542E]">{errors.cvc}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 py-3.5 font-black text-sm tracking-wide bg-[#D9542E] text-[#161512]"
          >
            PLACE ORDER →
          </button>
        </form>

        <div className="font-mono text-sm h-fit p-6 bg-[#EFEBE2]">
          <div className="font-mono text-xs uppercase tracking-wider mb-4 opacity-70">
            Order Summary
          </div>
          {cart.items.map((item) => (
            <div key={item.id + item.size} className="flex justify-between text-xs mb-2 opacity-80">
              <span>
                {item.product.name} ({item.size}) × {item.qty}
              </span>
              <span>${(item.product.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between mt-4 pt-3 font-bold text-base border-t border-dashed border-black/10">
            <span>Total</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}