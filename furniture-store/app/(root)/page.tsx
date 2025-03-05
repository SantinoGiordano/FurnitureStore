"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import SearchBar from "@/componets/searchBar";

interface Furniture {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale: number;
}

export default function Home() {
  const [items, setItems] = useState<Furniture[]>([]);

  useEffect(() => {
    async function fetchFurniture() {
      const response = await fetch("http://localhost:8080/api/furniture");
      const data = await response.json();
      setItems(data);
    }

    fetchFurniture();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Furniture Collection
      </h1>

    <SearchBar/>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl p-4">
            <figure>
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={400}
                className="w-full h-40 object-cover rounded"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-semibold">
                  ${item.price.toFixed(2)}
                </span>
                {/* Stock Status with Conditional Styling */}
                <span
                  className={`text-sm font-semibold ${
                    item.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <Link
                className="btn btn-primary w-full mt-4"
                href={`/furniture/${item.id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
