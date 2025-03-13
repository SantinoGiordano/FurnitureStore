import React, { useState, useEffect } from "react";

export interface Furniture {
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

export default function FurnitureSystem({ item }: { item: Furniture }) {
  const [favorite, setFavorite] = useState(item.favorite);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFavorite(item.favorite); // Sync with backend changes
  }, [item.favorite]);

  const toggleFavorite = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/furniture/favorited/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: !favorite }), // Send the toggled value
      });

      if (!response.ok) throw new Error("Failed to update favorite status.");

      setFavorite((prev) => !prev); // Update UI after a successful backend update
    } catch (error) {
      console.error("Error updating favorite status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={`hover:cursor-pointer ${loading ? "opacity-50" : ""}`} onClick={!loading ? toggleFavorite : undefined}>
        {favorite ? "❤️" : "🤍"}
      </div>
    </div>
  );
}