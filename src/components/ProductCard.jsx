import { Link } from "react-router-dom";

const USD_TO_NGN = 1370;

export default function ProductCard({ product }) {
  const nairaPrice = (product.price * USD_TO_NGN).toLocaleString();

  return (
    <div className="relative group">
      {product.tag && (
        <span className="absolute top-0 right-0 bg-black text-[#F6F4EF] font-mono text-[10px] tracking-wider px-2.5 py-1 z-10">
          {product.tag}
        </span>
      )}
      <Link to={"/product/" + product.id} className="block w-full text-left">
        <div className="overflow-hidden bg-[#EFEBE2]">
          <img
            src={product.img}
            alt={product.name}
            className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="pt-3 flex justify-between items-start">
          <div>
            <div className="font-mono text-[11px] opacity-50">{product.id}</div>
            <div className="font-bold text-sm mt-0.5">{product.name}</div>
            <div className="font-mono text-xs opacity-60">{product.color}</div>
          </div>
          <div className="text-right whitespace-nowrap pl-3">
            <div className="font-mono text-sm font-bold">₦{nairaPrice}</div>
            <div className="font-mono text-[10px] opacity-50">${product.price}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}