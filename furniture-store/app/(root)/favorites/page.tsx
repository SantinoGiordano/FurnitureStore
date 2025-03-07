"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import FurnitureSystem from "@/componets/favoriteSystem";
import RatingSystem from "@/componets/ratingSystem";

interface Furniture {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale?: number; // Optional sale price
  favorite: boolean;
}

export default function Home() {
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

  function renderFavoriteItems() {
    const favoriteItems = items.filter((item) => item.favorite);

    if (favoriteItems.length === 0) {
      return (
        <p className="text-center text-gray-500">
          You have not favorited anything.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-md">
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={150}
              className="rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-700">{item.description}</p>
            <p className="font-bold">
              <p>{item.price}</p>
            </p>
            <RatingSystem rating={item.rating} />
            <Link
              className="btn btn-primary w-full mt-4"
              href={`/furniture/${item.id}`}
            >
              View Details
            </Link>
            <FurnitureSystem item={item} />
          </div>
        ))}
      </div>
    );
  }

  if (loading) return <p className="text-center">Loading furniture...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Furniture Collection
      </h1>
      {renderFavoriteItems()}
    </div>
  );
}
