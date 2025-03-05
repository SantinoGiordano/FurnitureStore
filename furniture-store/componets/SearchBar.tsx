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
        const response = await fetch("http://localhost:8080/items");
        const json = await response.json();
        const filteredResults = json.filter((item) =>
          item?.title?.toLowerCase().includes(input.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const timeoutId = setTimeout(fetchData, 500); // Debounce for 500ms
    return () => clearTimeout(timeoutId);
  }, [input]);

  return (
    <div className="relative w-80 mx-auto">
      <div className="relative flex items-center">

        <input
          id="item-search"
          className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-full shadow-md focus:ring focus:ring-blue-300 focus:outline-none bg-gray-50"
          type="text"
          placeholder="Search for items..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {input && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50 max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            results.map((item, index) => (
              <li
                key={index}
                className="px-4 py-3 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-200"
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;