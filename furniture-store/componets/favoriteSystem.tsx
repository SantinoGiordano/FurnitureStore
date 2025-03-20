'use client'

import { useFavoritedStore } from "@/app/Store";

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
}

export default function FurnitureSystem() {

  const favorited = useFavoritedStore((state) => state.favorited)
  const toggleFalse = useFavoritedStore((state) => state.favorited)
  const toggleTrue = useFavoritedStore((state) => state.favorited)
  return (
    <>
    <div>
      {favorited}
      <button onClick={toggleTrue}>Favorite</button>
      <button onClick={toggleFalse}>Unfavorite</button>
    </div>
    </>
  );
}

// {favorite ? "❤️" : "🤍"}