"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import RatingSystem from "@/componets/ratingSystem";
import CartChecker from "@/componets/CartChecker";

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
  inCart: boolean;
}

export default function FurnitureDetail() {
  const { _id } = useParams();
  const [item, setItem] = useState<Furniture | null>(null);

  useEffect(() => {
    async function fetchFurnitureItem() {
      const response = await fetch(
        `http://localhost:8080/api/furniture/${_id}`
      );
      const data = await response.json();
      setItem(data);
    }

    if (_id) {
      fetchFurnitureItem();
    }
  }, [_id]);

  if (!item) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Image
        draggable="false"
        src={item.image}
        alt={item.name}
        width={600} // specify w_idth
        height={400} // specify height
        className="object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{item.name}</h1>
      <p className="text-gray-600 mt-2">{item.description}</p>
      <p className="text-xl font-semibold mt-4">${item.price.toFixed(2)}</p>
      <span
        className={`text-md font-semibold ${
          item.inStock ? "text-green-600" : "text-red-600"
        }`}
      >
        {item.inStock ? "In Stock" : "Out of Stock"}
        <div className="text-xl font-semibold mt-4">
          <RatingSystem rating={item.rating} />
          {item && <CartChecker item={item} />}
        </div>
      </span>
    </div>
  );
}
