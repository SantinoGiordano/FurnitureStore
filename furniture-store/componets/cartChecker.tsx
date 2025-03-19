'use client'

import React, { useState, useEffect } from "react";

export interface Furniture {
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

export default function CartChecker({ item }: { item: Furniture }) {
  const [inCart, setInCart] = useState(item.inCart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInCart(item.inCart);
  }, [item.inCart]);

  const toggleCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/api/furniture/cart/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inCart: !inCart }),
      });
  
      console.log("Response status:", response.status); // Log the status code
      console.log("Response body:", await response.json()); // Log the response body
  
      if (!response.ok) {
        throw new Error("Failed to update inCart status.");
      }
  
      setInCart((prev) => !prev); // Update UI
    } catch (error) {
      console.error("Error updating inCart status:", error);
      setError("Failed to update cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end">
      <div
        className={`hover:cursor-pointer ${loading ? "opacity-50" : ""} 
          ${inCart ? "bg-red-500 text-white" : "bg-green-500 text-white"} 
          px-4 py-2 rounded`}
        onClick={!loading ? toggleCart : undefined}
      >
        {inCart ? "Remove" : "Add"}
      </div>
      {loading && <span>Loading...</span>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
  
}