"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import SearchBar from "@/componets/SearchBar";
import FavoriteSystem from "@/componets/favoriteSystem";



interface Furniture {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale: number;
  favorite: boolean;
}

export default function Home() {
  const [items, setItems] = useState<Furniture[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFurniture() {
      try {
        const response = await fetch("http://localhost:8080/api/furniture");
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError("Unable to load furniture items. Please try again later.");
        console.log(err)
      }
    }

    fetchFurniture();
  }, []);

  return (

    <div className="p-8">
    {/* Parallax Hero Section */}
    <div
      className="w-full h-64 bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage: `url('livingRoom.webp')`, // Ensure the image is in the public folder
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Elegant Living Spaces</h1>
      </div>
    </div>

    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Furniture Collection
      </h1>

      <SearchBar />

      {error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No furniture available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow-xl p-4">
              <figure>
                <Image
                draggable = 'false'
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
                  <span
                    className={`text-sm font-semibold ${
                      item.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <span className="flex justify-between items-center mt-2">
                <Link
                  className="btn btn-primary w-full mt-4"
                  href={`/furniture/${item.id}`}
                >
                  View Details
                </Link>

                <FavoriteSystem key={item.id} item={item} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
