import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Confirmation() {
  const orderNum = useMemo(function () {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return "AH-" + randomNum;
  }, []);

  return (
    <div className="max-w-xl mx-auto px-5 py-24 text-center">
      <div className="font-mono text-xs uppercase tracking-widest mb-4 text-[#D9542E]">
        ORDER CONFIRMED
      </div>
      <h1 className="font-black text-3xl md:text-4xl mb-4">YOU'RE ALL SET.</h1>
      <p className="font-mono text-sm opacity-60 mb-8 leading-relaxed">
        Order {orderNum} is confirmed. This is a portfolio demo, so nothing was
        actually charged or shipped — but in a live store, your confirmation
        email would be on its way.
      </p>
      <Link
        to="/"
        className="font-black text-sm px-7 py-3 inline-block bg-black text-[#F6F4EF]"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}