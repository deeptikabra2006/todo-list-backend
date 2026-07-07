import dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("--------------------------------");
      console.log(`🚀 Server running on Port ${PORT}`);
      console.log(`🌍 Environment : ${process.env.NODE_ENV}`);
      console.log("--------------------------------");
    });

  } catch (error) {

    console.error("Server Failed");

    console.error(error);

  }
};

startServer();