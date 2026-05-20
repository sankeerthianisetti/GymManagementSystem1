import dotenv from "dotenv";
dotenv.config();  // <<< MUST come first

import connectDB from "./src/config/db.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
