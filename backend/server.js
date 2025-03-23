const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to bd
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to zincou api");
});

//API ROutes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
