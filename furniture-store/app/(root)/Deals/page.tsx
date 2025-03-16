"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import RatingSystem from "@/componets/ratingSystem";

interface Furniture {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale?: number;
  favorite: boolean;
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

  function dealsChecker() {
    const saleItems = items.filter((item) => item.sale !== undefined && item.sale > 0);
  
    if (saleItems.length === 0) {
      return <p className="text-center text-gray-500">No items on sale.</p>;
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {saleItems.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl p-4">
            <figure>
              <Image
                draggable="false"
                src={item.image}
                alt={item.name}
                width={600}
                height={400}
                className="w-full h-40 object-cover rounded"
              />
            </figure>
            <h2 className="text-xl font-semibold mt-2 flex items-center">
              {item.name}{" "}
              <span className="text-red-400 ml-2">{item.sale}%</span>
            </h2>
            <p className="text-gray-700">{item.description}</p>
            <hr />
            <p className="text-red-500 font-bold">
              Sale Price: ${(item.sale ? (item.price - item.sale) : item.price).toFixed(2)}
              <span className="text-gray-400 line-through ml-2">
                ${item.price}
              </span>
            </p>
            <hr />
            <span className="flex justify-between items-center mt-2">
              <Link
                className="btn btn-primary w-full mt-4"
                href={`/furniture/${item._id}`}
              >
                View Details
              </Link>
              <RatingSystem rating={item.rating} />
            </span>
          </div>
        ))}
      </div>
    );
  }
  

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Furniture Collection
      </h1>
      {dealsChecker()}
    </div>
  );
}
