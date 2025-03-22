const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connected succ");
  } catch (err) {
    console.error("mongoose connecting fail");
    process.exit(1);
  }
};
module.exports = connectDB;
