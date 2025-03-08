import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const SortOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef(null);

  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Name: A-Z", value: "name_asc" },
    { label: "Name: Z-A", value: "name_desc" },
    { label: "Best Selling", value: "best_selling" },
  ];

  // Get current sort option from URL or default to "newest"
  const currentSort = searchParams.get("sort") || "newest";

  // Find the label for the current sort value
  const currentSortLabel =
    sortOptions.find((option) => option.value === currentSort)?.label ||
    "Sort By";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortChange = (sortValue) => {
    const newParams = new URLSearchParams(searchParams);

    // Update sort parameter
    if (sortValue === "newest") {
      // Remove the sort parameter if it's the default option
      newParams.delete("sort");
    } else {
      newParams.set("sort", sortValue);
    }

    // Update URL
    setSearchParams(newParams);
    setIsOpen(false);
  };

  return (
    <div className="relative z-10 mb-6" ref={dropdownRef}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {searchParams.get("limit") || "20"} products per page
        </div>

        <button
          onClick={toggleDropdown}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="mr-2">{currentSortLabel}</span>
          <IoIosArrowDown
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            {sortOptions.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    currentSort === option.value
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortOption;
