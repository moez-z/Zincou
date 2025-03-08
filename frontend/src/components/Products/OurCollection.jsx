import React from "react";

const OurCollections = () => {
  const collections = [
    {
      name: "Casual",
      image: "https://picsum.photos/800/600?random=1",
    },
    {
      name: "Formal",
      image: "https://picsum.photos/800/600?random=2",
    },
    {
      name: "Party",
      image: "https://picsum.photos/800/600?random=3",
    },
    {
      name: "Gym",
      image: "https://picsum.photos/800/600?random=4",
    },
  ];

  return (
    <section className="w-full md:w-3/4 py-12 bg-blanc-1 dark:bg-gray-900 mx-auto md:ml-auto lg:ml-60 rounded-xl my-8 px-4">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
          Our Collections
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
          Explore our diverse collections tailored for every occasion.
        </p>
      </div>

      {/* Collection Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-white text-xl md:text-2xl font-bold uppercase tracking-wider text-center p-3 md:p-4 bg-black bg-opacity-50 rounded-lg">
                  {collection.name}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full py-2 bg-white text-black font-medium rounded hover:bg-gray-100 transition-colors">
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCollections;
