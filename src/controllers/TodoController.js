import { validationResult } from "express-validator";

import TodoService from "../services/TodoService.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";

class TodoController {
  // Create Todo
  static createTodo = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(400, "Validation Failed", errors.array());
    }

    const todo = await TodoService.createTodo(req.body, req.user._id);

    return res
      .status(201)
      .json(new ApiResponse(201, todo, "Todo Created Successfully"));
  });

  // Get All Todos
  static getAllTodos = AsyncHandler(async (req, res) => {
    const todos = await TodoService.getAllTodos(req.user._id, req.query);

    return res
      .status(200)
      .json(new ApiResponse(200, todos, "Todos Fetched Successfully"));
  });

  // Get Todo By ID
  static getTodoById = AsyncHandler(async (req, res) => {
    const todo = await TodoService.getTodoById(req.params.id, req.user._id);

    return res
      .status(200)
      .json(new ApiResponse(200, todo, "Todo Fetched Successfully"));
  });

  // Update Todo
  static updateTodo = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(400, "Validation Failed", errors.array());
    }

    const todo = await TodoService.updateTodo(
      req.params.id,
      req.user._id,
      req.body,
    );

    return res
      .status(200)
      .json(new ApiResponse(200, todo, "Todo Updated Successfully"));
  });

  // Delete Todo
  static deleteTodo = AsyncHandler(async (req, res) => {
    await TodoService.deleteTodo(req.params.id, req.user._id);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Todo Deleted Successfully"));
  });

  // Toggle Todo Status
  static toggleStatus = AsyncHandler(async (req, res) => {
    const todo = await TodoService.toggleStatus(req.params.id, req.user._id);

    return res
      .status(200)
      .json(new ApiResponse(200, todo, "Todo Status Updated Successfully"));
  });
}

export default TodoController;