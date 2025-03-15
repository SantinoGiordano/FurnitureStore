'use client'

import { useEffect, useState } from "react";

interface Furniture {
    _id:string;
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
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchFurniture() {
        try {
          const response = await fetch("http://localhost:8080/api/furniture");
          if (!response.ok) throw new Error("Failed to fetch data");
          
          const data = await response.json();
          setItems(data);
        } catch (err) {
          setError("Unable to load furniture items. Please try again later.");
          console.log(err)
        }
      }
  
      fetchFurniture();
    }, []);
    
    return (
    <div className="fixed top-60 right-8 h-fit w-80 bg-white shadow-lg border border-gray-200 z-50 p-4">
        <h2 className="text-lg font-bold">Shopping Cart</h2>
    </div>    
    );
  }
 