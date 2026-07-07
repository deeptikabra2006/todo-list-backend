import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/AuthRoutes.js";
import todoRoutes from "./routes/TodoRoutes.js";
import errorHandler from "./middleware/ErrorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://todo-list-backend-three-wine.vercel.app/",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Todo API is running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found : ${req.originalUrl}`,
  });
});

app.use(errorHandler);

export default app;