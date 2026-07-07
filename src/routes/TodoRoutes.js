import express from "express";

import TodoController from "../controllers/TodoController.js";

import { verifyToken } from "../middleware/AuthMiddleware.js";

import {
  createTodoValidator,
  updateTodoValidator,
  todoIdValidator,
} from "../validators/TodoValidator.js";

const router = express.Router();

// Create Todo
router.post("/", verifyToken, createTodoValidator, TodoController.createTodo);

// Get All Todos
router.get("/", verifyToken, TodoController.getAllTodos);

// Get Todo By ID
router.get("/:id", verifyToken, todoIdValidator, TodoController.getTodoById);

// Update Todo
router.put(
  "/:id",
  verifyToken,
  todoIdValidator,
  updateTodoValidator,
  TodoController.updateTodo,
);

// Delete Todo
router.delete("/:id", verifyToken, todoIdValidator, TodoController.deleteTodo);

// Toggle Status
router.patch(
  "/:id/status",
  verifyToken,
  todoIdValidator,
  TodoController.toggleStatus,
);

export default router;