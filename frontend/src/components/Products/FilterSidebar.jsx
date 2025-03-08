import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Data constants moved outside component
const FILTER_DATA = {
  categories: [
    "T-Shirts",
    "Jeans",
    "Jackets",
    "Shoes",
    "Accessories",
    "Dresses",
    "Sweaters",
  ],
  colors: [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Gray",
  ],
  collections: [
    "Summer 2024",
    "Winter 2024",
    "Spring 2024",
    "Limited Edition",
    "Best Sellers",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  priceRange: {
    min: 0,
    max: 100,
  },
};

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    size: [],
    collection: "",
    minPrice: FILTER_DATA.priceRange.min,
    maxPrice: FILTER_DATA.priceRange.max,
  });

  useEffect(() => {
    // Parse filters from URL parameters
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      color: params.color || "",
      collection: params.collection || "",
      size: params.size ? params.size.split(",") : [],
      minPrice: params.minPrice
        ? parseInt(params.minPrice)
        : FILTER_DATA.priceRange.min,
      maxPrice: params.maxPrice
        ? parseInt(params.maxPrice)
        : FILTER_DATA.priceRange.max,
    });
  }, [searchParams]);

  // Generic handler for simple filters
  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    updateSearchParams(updatedFilters);
  };

  // Special handler for size filter (toggle behavior)
  const handleSizeToggle = (size) => {
    const newSizes = filters.size.includes(size)
      ? filters.size.filter((s) => s !== size)
      : [...filters.size, size];

    handleFilterChange("size", newSizes);
  };

  // Handler for price range slider
  const handlePriceChange = (value) => {
    const maxPrice = parseInt(value);
    const updatedFilters = {
      ...filters,
      minPrice: FILTER_DATA.priceRange.min,
      maxPrice,
    };
    setFilters(updatedFilters);
    updateSearchParams(updatedFilters);
  };

  // Update URL parameters based on filter state
  const updateSearchParams = (updatedFilters) => {
    const newParams = {};

    // Only add non-empty/default parameters to URL
    if (updatedFilters.category) newParams.category = updatedFilters.category;
    if (updatedFilters.color) newParams.color = updatedFilters.color;
    if (updatedFilters.collection)
      newParams.collection = updatedFilters.collection;
    if (updatedFilters.size.length > 0)
      newParams.size = updatedFilters.size.join(",");
    if (updatedFilters.minPrice > FILTER_DATA.priceRange.min)
      newParams.minPrice = updatedFilters.minPrice.toString();
    if (updatedFilters.maxPrice < FILTER_DATA.priceRange.max)
      newParams.maxPrice = updatedFilters.maxPrice.toString();

    setSearchParams(newParams);
  };

  // Reusable filter section component
  const FilterSection = ({ title, children, className = "" }) => (
    <div className={`mb-6 border-b pb-4 border-gray-200 ${className}`}>
      <h3 className="text-gray-800 font-medium mb-3">{title}</h3>
      {children}
    </div>
  );

  // Function to determine if a color needs a dark checkmark
  const needsDarkCheckmark = (color) => ["White", "Yellow"].includes(color);

  return (
    <div className="w-full md:w-3/4 px-3 py-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="w-full">
        {/* Category Filter */}
        <FilterSection title="Category">
          <div className="flex flex-wrap gap-2">
            {FILTER_DATA.categories.map((category) => (
              <label
                key={category}
                className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-all ${
                  filters.category === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={() => handleFilterChange("category", category)}
                  className="sr-only"
                />
                {category}
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price filter */}
        <FilterSection title="Price Range">
          <input
            type="range"
            name="priceRange"
            min={FILTER_DATA.priceRange.min}
            max={FILTER_DATA.priceRange.max}
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-gray-600 mt-2">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
        </FilterSection>

        {/* Color filter */}
        <FilterSection title="Color">
          <div className="grid grid-cols-5 gap-3">
            {FILTER_DATA.colors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Select ${color} color`}
                className={`w-10 h-10 rounded-full transition-all ${
                  filters.color === color
                    ? "ring-2 ring-offset-2 ring-blue-500 scale-105"
                    : "hover:scale-105"
                }`}
                style={{
                  backgroundColor: color.toLowerCase(),
                  border: color === "White" ? "1px solid #e5e7eb" : "none",
                }}
                onClick={() => handleFilterChange("color", color)}
              >
                {filters.color === color && (
                  <span
                    className="flex justify-center items-center text-sm font-bold"
                    style={{
                      color: needsDarkCheckmark(color) ? "black" : "white",
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Size filter */}
        <FilterSection title="Size">
          <div className="flex flex-wrap gap-2">
            {FILTER_DATA.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filters.size.includes(size)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleSizeToggle(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Collections Filter */}
        <FilterSection title="Collection" className="mb-6">
          <div className="flex flex-col space-y-2">
            {FILTER_DATA.collections.map((collection) => (
              <label
                key={collection}
                className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-all ${
                  filters.collection === collection
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="collection"
                  value={collection}
                  checked={filters.collection === collection}
                  onChange={() => handleFilterChange("collection", collection)}
                  className="sr-only"
                />
                {collection}
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterSidebar;
