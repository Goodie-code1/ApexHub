import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const isNewFilter = searchParams.get("filter") === "new";

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  let list = PRODUCTS.filter((p) => category === "All" || p.category === category);
  if (isNewFilter) list = list.filter((p) => p.tag === "NEW");
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <div className="mb-8">
        <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">
          {isNewFilter ? "New Arrivals" : category === "All" ? "Full Catalog" : category}
        </div>
        <h1 className="font-black text-3xl md:text-4xl">
          {isNewFilter ? "NEW ARRIVALS" : category.toUpperCase()}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8 pb-6 border-b border-black/10">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = category === cat && !isNewFilter;
            const activeClass = isActive ? "bg-black text-[#F6F4EF]" : "bg-transparent text-black";
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={"font-mono text-xs uppercase tracking-wider px-3 py-1.5 whitespace-nowrap border border-black " + activeClass}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-mono text-xs px-3 py-2 border border-black bg-transparent outline-none w-44"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="font-mono text-xs px-3 py-2 border border-black bg-transparent outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="py-20 text-center font-mono text-sm opacity-60">
          No products match that search. Try a different term or category.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}