"use client";
import React from "react";
interface Furniture {
  favorite: boolean;
}

const Hearts = ({ favorite }: { favorite: boolean }) => {
  return <div>{favorite ? "❤️" : "🤍"}</div>;
};

const FavoriteSystem = ({ item }: { item: Furniture }) => {
  return <Hearts favorite={item.favorite} />;
};

export default FavoriteSystem;
