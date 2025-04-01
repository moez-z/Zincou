const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const Card = require("./models/Card");
const User = require("./models/User");
const products = require("./data/products");

dotenv.config();
//connect to db
mongoose.connect(process.env.MONGO_URI);

//function to seed db
const seedData = async () => {
  try {
    // clear db
    await Product.deleteMany();
    await User.deleteMany();
    await Card.deleteMany();

    //create a admin user
    const createdUsers = await User.create({
      name: "admin",
      email: "Ht2k9@example.com",
      password: "123456",
      role: "admin",
    });

    // assign the default user id to each product
    const userID = createdUsers._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    //insert the products
    await Product.insertMany(sampleProducts);
    console.log("Product seeded");
    process.exit();
  } catch (error) {
    console.error("error seeding db", error);
    process.exit(1);
  }
};
seedData();
