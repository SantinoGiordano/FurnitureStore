"use client";

import { useFavoritedStore } from "@/app/Store";

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
}

export default function FavoriteSystem() {
  const favorited = useFavoritedStore((state) => state.favorited);
  const toggleTrue = useFavoritedStore((state) => state.toggleTrue);
  const toggleFalse = useFavoritedStore((state) => state.toggleFalse);


  const handleToggleFavorite = () => {
    if (favorited) {
      toggleFalse();
    } else {
      toggleTrue();
    }
  };

  return (
    <button onClick={handleToggleFavorite}>
      {favorited ? "❤️" : "🤍"}
    </button>
  );
}
 