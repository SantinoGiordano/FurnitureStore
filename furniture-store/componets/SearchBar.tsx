import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!input.trim()) {
        setResults([]);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/furniture");
        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        console.log("Fetched data:", json); // Debugging

        const filteredResults = json.filter((item) =>
          item?.name?.toLowerCase().includes(input.toLowerCase()) // ✅ Fixed property name
        );

        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]); // Ensure errors do not break UI
      }
    };

    const timeoutId = setTimeout(fetchData, 500); // Debounce for 500ms
    return () => clearTimeout(timeoutId);
  }, [input]);

  return (
    <div className="relative w-80">
      <input
        id="item-search"
        className="input input-bordered input-lg w-full shadow-lg focus:ring focus:ring-blue-400"
        type="text"
        placeholder="Search for items..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {input && results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden z-50">
          {results.map((item, index) => (
            <li
              key={item.id} // Prefer using `id` if available
              className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer transition-all"
            >
              {item.name} {/* ✅ Fixed property name */}
            </li>
          ))}
        </ul>
      )}

      {input && results.length === 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden z-50">
          <li className="px-4 py-2 text-gray-500">No results found</li>
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
