import React from "react";
import menCollection from "../../assets/mens-collection.webp";
import womenCollection from "../../assets/womens-collection.webp";
import { useSearchParams, useNavigate } from "react-router-dom";

const GenderCollectionSection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const collections = [
    { title: "Women's Collection", img: womenCollection, gender: "Women" },
    { title: "Men's Collection", img: menCollection, gender: "Men" },
  ];

  const handleShopNow = (gender) => {
    // Keep existing filters and add/update gender
    const params = Object.fromEntries([...searchParams]);
    params.gender = gender;
    navigate({
      pathname: "/collections/all",
      search: new URLSearchParams(params).toString(),
    });
  };

  return (
    <section className="py-12 px-4 lg:px-0 bg-gray-50">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Our Collections</h2>
        <p className="text-gray-600">
          Discover our exclusive range for men and women
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <div
            key={collection.gender}
            className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={collection.img}
              alt={`${collection.gender} collection`}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-25 transition-opacity duration-300 hover:bg-opacity-40" />

            <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {collection.title}
              </h2>
              <button
                onClick={() => handleShopNow(collection.gender)}
                className="inline-block text-blue-600 font-medium hover:underline"
              >
                Shop Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenderCollectionSection;
