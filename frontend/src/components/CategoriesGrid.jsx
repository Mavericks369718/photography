import React from "react";
import { categories } from "../mock";

function Badge({ label }) {
  if (!label) return null;
  const color = label === "Trending" ? "bg-rose-800" : "bg-rose-700";
  return (
    <span
      className={`absolute top-0 left-0 ${color} text-white text-[11px] font-semibold px-2.5 py-1 rounded-tl-2xl rounded-br-2xl shadow`}
    >
      {label}
    </span>
  );
}

function CategoryCard({ cat }) {
  return (
    <button className="group flex flex-col items-start text-left">
      <div
        className={`relative ${cat.wide ? "aspect-[2.1/1]" : "aspect-square"} w-full overflow-hidden rounded-2xl bg-[#F8D7D9] ring-1 ring-black/5 shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-0.5`}
      >
        <img
          src={cat.image}
          alt={cat.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 to-transparent" />
        <Badge label={cat.badge} />
      </div>
      <p className="mt-2.5 text-[14px] font-semibold leading-tight text-neutral-900 whitespace-pre-line">
        {cat.title}
      </p>
    </button>
  );
}

export default function CategoriesGrid() {
  // first row: 2 square + 1 wide
  const firstRow = categories.slice(0, 3);
  const rest = categories.slice(3);

  return (
    <section className="px-5 pb-8">
      <h2 className="text-[22px] font-bold text-neutral-900 mb-4 tracking-tight">
        Explore Our Categories
      </h2>

      <div className="grid grid-cols-4 gap-3 mb-3">
        <div className="col-span-1">
          <CategoryCard cat={firstRow[0]} />
        </div>
        <div className="col-span-1">
          <CategoryCard cat={firstRow[1]} />
        </div>
        <div className="col-span-2">
          <CategoryCard cat={firstRow[2]} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {rest.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  );
}
