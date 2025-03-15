const { connect } = require("mongoose");

async function connectDB() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
}

module.exports = connectDB;