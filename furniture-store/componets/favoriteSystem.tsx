import React, { useState } from "react";

interface Furniture {
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

const FurnitureSystem = ({ item }: { item: Furniture }) => {
  const [furniture, setFurniture] = useState(item);

  const changeHeart = () => {
    setFurniture((prev) => ({
      ...prev,
      favorite: !prev.favorite, // Toggle the favorite value
    }));
    console.log(`${furniture.favorite ? "true" : "false"} >>> ${!furniture.favorite ? "true" : "false"}`);
  };

  return (
    <div>
      <div onClick={changeHeart}>
        {furniture.favorite ? "❤️" : "🤍"}
      </div>
      {/* Add more item details here */}
    </div>
  );
};

export default FurnitureSystem;