"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import RatingSystem from "@/componets/ratingSystem";
import FavoriteSystem from "@/componets/favoriteSystem";

export interface Furniture {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
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
               <span className="flex justify-between items-center mt-2">
                 <h2 className="card-title">{item.name}</h2>
                 <RatingSystem key={item.id} rating={item.rating} />
               </span>
               <p className="text-sm text-gray-500">{item.description}</p>
               <hr/>
               <hr/>
               <hr/>
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
               <hr/>
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
