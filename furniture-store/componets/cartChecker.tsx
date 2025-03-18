'use client'

import React, { useState, useEffect } from "react";

export interface Furniture {
  _id: string; // ✅ Changed id to _id
  id:string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale?: number;
  favorite: boolean;
  inCart:boolean;
}

export default function CartChecker(item:Furniture) {
  const [inCart, setInCart] = useState(item.inCart);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInCart(item.inCart); // ✅ Sync with backend changes
  }, [item.inCart]);

  const toggleCart = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/furniture/cart/${item._id}`, {
        mode: 'cors',
        // credentials: 'include',
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inCart: !inCart }), // ✅ Send new favorite value
      });

      if (!response.ok) throw new Error("Failed to update favorite status.");

      setInCart((prev) => !prev); // ✅ Update UI
    } catch (error) {
      console.error("Error updating favorite status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={`hover:cursor-pointer ${loading ? "opacity-50" : ""}`} onClick={!loading ? toggleCart : undefined}>
        {inCart ? "Add" : "Remove"}
      </div>
    </div>
  );
}
