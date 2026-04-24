import React from "react";
import { categories } from "../mock";

function Badge({ label }) {
  if (!label) return null;
  const color = label === "Trending" ? "bg-[#8B1538]" : "bg-[#A11D44]";
  return (
    <span
      className={`absolute top-0 left-0 ${color} text-white text-[10px] font-semibold px-2 py-0.5 rounded-tl-2xl rounded-br-xl shadow`}
    >
      {label}
    </span>
  );
}

function CategoryCard({ cat }) {
  return (
    <button className="group flex flex-col items-start text-left">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F8D7D9] ring-1 ring-black/5 shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-0.5">
        <img
          src={cat.image}
          alt={cat.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge label={cat.badge} />
      </div>
      <p className="mt-2 text-[12.5px] font-semibold leading-[1.15] text-neutral-900 whitespace-pre-line tracking-tight">
        {cat.title}
      </p>
    </button>
  );
}

export default function CategoriesGrid() {
  const list = categories.filter((c) => !c.wide);

  return (
    <section className="px-5 pb-8">
      <h2 className="text-[22px] font-extrabold text-neutral-900 mb-4 tracking-[-0.02em]">
        Explore Our Categories
      </h2>

      <div className="grid grid-cols-4 gap-2.5">
        {list.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  );
}
