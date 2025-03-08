const mongoose = require("mongoose");
const Product = require("./src/models/Product"); // Adjust the path as needed
const dotenv = require("dotenv");

dotenv.config();

const products = [
  {
    name: "Men's Casual Shirt",
    price: 29.99,
    description: "A comfortable and stylish casual shirt for men.",
    category: "Shirts",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "White", "Black"],
    stock: 100,
  },
  {
    name: "Women's Summer Dress",
    price: 49.99,
    description: "A light and elegant summer dress for women.",
    category: "Dresses",
    images: [
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Red", "Yellow", "Pink"],
    stock: 75,
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    return Product.insertMany(products); // Insert seed data
  })
  .then(() => {
    console.log("Database seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
  });
