import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import OurCollection from "../components/Products/OurCollection";
import ProductDetails from "../components/Products/ProductDetails";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";

const Home = () => {
  return (
    <div>
      <FeaturedCollection />
      <NewArrivals />
      <GenderCollectionSection />
      <OurCollection />

      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />
      <FeaturesSection />
      <Hero />
    </div>
  );
};

export default Home;
