const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // skipping db connection in DAST
    if (process.env.SKIP_DB === "true") {
      console.warn("⚠️ Skipping DB connection (CI mode)");
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

