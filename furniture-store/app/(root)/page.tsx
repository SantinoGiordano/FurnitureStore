'use client'

import { useState, useEffect } from 'react';

interface Furniture {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale: number;
}
export default function Home() {

  const [items, setItems] = useState<Furniture[]>([]);

  useEffect(() => {
    async function fetchFurniture() {
      const response = await fetch('http://localhost:8080/api/furniture');
      const data = await response.json();
      setItems(data);
    }

    fetchFurniture();
  }, []); 

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li> 
      ))}
    </ul>
  );
}
