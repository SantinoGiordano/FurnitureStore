// FurnitureSystem.tsx
"use client";

import { useEffect, useState } from "react";
import { useFavoritedStore } from "@/app/Store";
import RatingSystem from "@/componets/ratingSystem";
import SearchBar from "@/componets/SearchBar";


export interface Furniture {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale?: number;
}

export default function FurnitureSystem() {
  const [items, setItems] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFurniture() {
      try {
        const response = await fetch("http://localhost:8080/api/furniture");
        if (!response.ok) throw new Error("Failed to fetch furniture data.");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchFurniture();
  }, []);

  if (loading) return <p>Loading furniture...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Furniture Collection
      </h1>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Grid Layout for Furniture Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <FurnitureItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

function FurnitureItem({ item }: { item: Furniture }) {
  
  const favorites = useFavoritedStore((state) => state.favorites);
  const toggleFavorite = useFavoritedStore((state) => state.toggleFavorite);

  const isFavorited = favorites[item._id] || false;

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <figure>
        <img
          src={item.image}
          alt={item.name}
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
          <span
            className={`text-sm font-semibold ${
              item.inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <RatingSystem rating={item.rating} />
        <span>
        <button
          onClick={() => toggleFavorite(item._id)}
          className="mt-4 p-2 bg-gray-200 rounded"
          >
          {isFavorited ? "❤️" : "🤍"}
        </button>
        {/* <CartChecker item={item._id} /> */}
          </span>
      </div>
    </div>
  );
}
