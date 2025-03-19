"use client";

import { useState, useEffect } from "react";

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

export default function Cart() {
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
        console.log(err);
      }
    }

    fetchFurniture();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {items.filter((item) => item.inCart).length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500 mt-8">
          No items in cart
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl  w-6/12">
          <h2 className="text-2xl font-semibold mb-4 text-right bg-gray-800 text-white p-4">
            Items in Your Cart
          </h2>
          <div className="space-y-4">
            {items
              .filter((item) => item.inCart)
              .map((item) => (
                <div key={item._id} className="p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-green-500">${item.price}</span>
                  </div>
                </div>
              ))}
            
            <div className="p-5">
              <span>
                <p className="text-4xl">+</p><p className="text-right text-2xl">Total</p>
              </span>
              <hr />
              <div className="text-right"> Total </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
