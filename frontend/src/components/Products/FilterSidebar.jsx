import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronUp, X } from "lucide-react";

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
  priceRange: { min: 0, max: 100 },
  genders: ["Men", "Women"], // ✅ Added genders
};

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expanded, setExpanded] = useState("category");

  const [filters, setFilters] = useState({
    gender: "", // ✅ Added gender
    category: "",
    color: "",
    sizes: [],
    collections: "",
    minPrice: FILTER_DATA.priceRange.min,
    maxPrice: FILTER_DATA.priceRange.max,
  });

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      gender: params.gender || "",
      category: params.category || "",
      color: params.color || "",
      collections: params.collections || "",
      sizes: params.sizes ? params.sizes.split(",") : [],
      minPrice: params.minPrice
        ? parseInt(params.minPrice)
        : FILTER_DATA.priceRange.min,
      maxPrice: params.maxPrice
        ? parseInt(params.maxPrice)
        : FILTER_DATA.priceRange.max,
    });
  }, [searchParams]);

  const updateSearchParams = (updatedFilters) => {
    const newParams = {};
    if (updatedFilters.gender) newParams.gender = updatedFilters.gender;
    if (updatedFilters.category) newParams.category = updatedFilters.category;
    if (updatedFilters.color) newParams.color = updatedFilters.color;
    if (updatedFilters.collections)
      newParams.collections = updatedFilters.collections;
    if (updatedFilters.sizes.length > 0)
      newParams.sizes = updatedFilters.sizes.join(",");
    if (updatedFilters.minPrice > FILTER_DATA.priceRange.min)
      newParams.minPrice = updatedFilters.minPrice.toString();
    if (updatedFilters.maxPrice < FILTER_DATA.priceRange.max)
      newParams.maxPrice = updatedFilters.maxPrice.toString();
    setSearchParams(newParams);
  };

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    updateSearchParams(updated);
  };

  const handleSizeToggle = (size) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    handleFilterChange("sizes", newSizes);
  };

  const handlePriceChange = (value) => {
    const updated = { ...filters, maxPrice: parseInt(value) };
    setFilters(updated);
    updateSearchParams(updated);
  };

  const handleClearFilters = () => {
    setFilters({
      gender: "",
      category: "",
      color: "",
      sizes: [],
      collections: "",
      minPrice: FILTER_DATA.priceRange.min,
      maxPrice: FILTER_DATA.priceRange.max,
    });
    setSearchParams({});
  };

  const FilterSection = ({ title, id, children }) => {
    const isOpen = expanded === id;
    return (
      <div className="border-b border-gray-200 py-3">
        <button
          onClick={() => setExpanded(isOpen ? null : id)}
          className="flex justify-between items-center w-full text-left"
        >
          <h3 className="font-medium text-gray-800">{title}</h3>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {isOpen && <div className="mt-3">{children}</div>}
      </div>
    );
  };

  return (
    <div className="w-full md:w-80 bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <X size={14} /> Clear all
        </button>
      </div>

      {/* Gender Filter */}
      <FilterSection title="Gender" id="gender">
        <div className="flex gap-2">
          {FILTER_DATA.genders.map((gender) => (
            <button
              key={gender}
              className={`px-3 py-1.5 rounded-md text-sm ${
                filters.gender === gender
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleFilterChange("gender", gender)}
            >
              {gender}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Category Filter */}
      <FilterSection title="Category" id="category">
        <div className="flex flex-wrap gap-2">
          {FILTER_DATA.categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 rounded-md text-sm ${
                filters.category === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleFilterChange("category", category)}
            >
              {category}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="Price Range" id="price">
        <input
          type="range"
          min={FILTER_DATA.priceRange.min}
          max={FILTER_DATA.priceRange.max}
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-gray-600 text-sm mt-2">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </FilterSection>

      {/* Color Filter */}
      <FilterSection title="Color" id="color">
        <div className="grid grid-cols-6 gap-2">
          {FILTER_DATA.colors.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => handleFilterChange("color", color)}
              className={`w-8 h-8 rounded-full border ${
                filters.color === color
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "hover:scale-105 transition-transform"
              } ${
                color === "White" ? "border-gray-300" : "border-transparent"
              }`}
            >
              {filters.color === color && (
                <span
                  className={`text-xs font-bold ${
                    ["White", "Yellow"].includes(color)
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection title="Size" id="size">
        <div className="flex flex-wrap gap-2">
          {FILTER_DATA.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                filters.sizes.includes(size)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Collections Filter */}
      <FilterSection title="Collection" id="collections">
        <div className="flex flex-col gap-2">
          {FILTER_DATA.collections.map((collection) => (
            <button
              key={collection}
              className={`px-3 py-1.5 rounded-md text-sm text-left ${
                filters.collections === collection
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleFilterChange("collections", collection)}
            >
              {collection}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;
