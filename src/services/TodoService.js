import mongoose from "mongoose";
import Todo from "../models/TodoModel.js";
import ApiError from "../utils/ApiError.js";

class TodoService {
  // Create Todo
  static async createTodo(data, userId) {
    const todo = await Todo.create({
      ...data,
      user: userId,
    });

    return todo;
  }

  // Get All Todos of Logged In User
  static async getAllTodos(userId, queryParams = {}) {
    const { page = 1, limit = 10, search, status, priority, tag, sortBy, all } = queryParams;

    const query = { user: userId };

    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "ALL") {
      query.status = status;
    }

    if (priority && priority !== "ALL") {
      query.priority = priority;
    }

    if (tag && tag !== "ALL") {
      query.tags = tag;
    }

    // Determine sorting
    let sortQuery = { createdAt: -1 }; // default
    if (sortBy === "createdAt_asc") {
      sortQuery = { createdAt: 1 };
    } else if (sortBy === "dueDate_asc") {
      sortQuery = { dueDate: 1 };
    } else if (sortBy === "dueDate_desc") {
      sortQuery = { dueDate: -1 };
    } else if (sortBy === "title_asc") {
      sortQuery = { title: 1 };
    } else if (sortBy === "title_desc") {
      sortQuery = { title: -1 };
    } else if (sortBy === "status_asc" || sortBy === "status_desc" || sortBy === "priority_asc" || sortBy === "priority_desc") {
      const dir = sortBy.endsWith("_desc") ? -1 : 1;
      const field = sortBy.split("_")[0];
      sortQuery = { [field]: dir };
    }

    // Calculate stats based on user: userId (overall totals)
    let statsCounts = [];
    try {
      const targetUserId = new mongoose.Types.ObjectId(userId.toString());
      
      statsCounts = await Todo.aggregate([
        { $match: { user: targetUserId } },
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]);
    } catch (err) {
      throw new ApiError(500, `Aggregation failed: ${err.message}`);
    }

    let completed = 0;
    let inProgress = 0;
    let pending = 0;
    statsCounts.forEach(item => {
      if (item._id === 'COMPLETED') completed = item.count;
      else if (item._id === 'IN_PROGRESS') inProgress = item.count;
      else if (item._id === 'PENDING') pending = item.count;
    });

    const total = completed + inProgress + pending;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const stats = { total, completed, inProgress, pending, completionRate };

    // If 'all' bypass query requested, return the complete list immediately (useful for dashboard calculations)
    if (all === "true" || all === true || limit === 0 || limit === "0" || limit === 0) {
      const todos = await Todo.find(query).sort(sortQuery);
      return {
        todos,
        totalCount: todos.length,
        page: 1,
        limit: todos.length,
        totalPages: 1,
        stats,
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalCount = await Todo.countDocuments(query);
    const todos = await Todo.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit));

    return {
      todos,
      totalCount,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      stats,
    };
  }

  // Get Todo By ID
  static async getTodoById(todoId, userId) {
    const todo = await Todo.findOne({
      _id: todoId,
      user: userId,
    });

    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }

    return todo;
  }

  // Update Todo
  static async updateTodo(todoId, userId, data) {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: todoId,
        user: userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }

    return todo;
  }

  // Delete Todo
  static async deleteTodo(todoId, userId) {
    const todo = await Todo.findOneAndDelete({
      _id: todoId,
      user: userId,
    });

    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }

    return null;
  }

  // Toggle Status
  static async toggleStatus(todoId, userId) {
    const todo = await Todo.findOne({
      _id: todoId,
      user: userId,
    });

    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }

    todo.status = todo.status === "COMPLETED" ? "PENDING" : "COMPLETED";

    await todo.save();

    return todo;
  }
}

export default TodoService;