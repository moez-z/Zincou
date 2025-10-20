const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // ADD THIS
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cardRoutes = require("./routes/CardRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const orderAdminRoutes = require("./routes/orderAdminRoutes");

dotenv.config(); // MOVE THIS UP (before using process.env)

const app = express();
app.use(express.json());
app.use(cookieParser()); // ADD THIS - Must be before routes

// UPDATE CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Your React app URL
    credentials: true, // IMPORTANT: Allow cookies to be sent
  })
);

const PORT = process.env.PORT || 3000;

// connect to bd
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to zincou api");
});

//API ROutes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscriberRoutes);

// admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", orderAdminRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
