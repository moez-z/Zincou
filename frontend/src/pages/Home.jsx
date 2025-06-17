import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import OurCollection from "../components/Products/OurCollection";
import ProductDetails from "../components/Products/ProductDetails";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";
import ProductGrid from "../components/Products/ProductGrid";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState();
  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "bottom Wear",
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );

        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
        console.error("Error details:", error.response?.data); // More detailed error info
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <FeaturedCollection />
      <NewArrivals />
      <GenderCollectionSection />
      <OurCollection />

      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>

      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller...</p>
      )}

      <FeaturesSection />
      <Hero />
    </div>
  );
};

export default Home;
