import { body, param } from "express-validator";

export const createTodoValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters")
    .trim(),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters")
    .trim(),

  body("priority")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Invalid Priority"),

  body("status")
    .optional()
    .isIn(["PENDING", "IN_PROGRESS", "COMPLETED"])
    .withMessage("Invalid Status"),

  body("dueDate").optional().isISO8601().withMessage("Invalid Due Date"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),
  body("tags.*")
    .optional()
    .isString()
    .withMessage("Each tag must be a string")
    .trim(),

  body("subtasks")
    .optional()
    .isArray()
    .withMessage("Subtasks must be an array of objects"),
  body("subtasks.*.title")
    .optional()
    .notEmpty()
    .withMessage("Subtask title is required")
    .isString()
    .withMessage("Subtask title must be a string")
    .trim(),
  body("subtasks.*.completed")
    .optional()
    .isBoolean()
    .withMessage("Subtask completion status must be a boolean"),
];

export const updateTodoValidator = [
  body("title")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters")
    .trim(),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters")
    .trim(),

  body("priority")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Invalid Priority"),

  body("status")
    .optional()
    .isIn(["PENDING", "IN_PROGRESS", "COMPLETED"])
    .withMessage("Invalid Status"),

  body("dueDate").optional().isISO8601().withMessage("Invalid Due Date"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),
  body("tags.*")
    .optional()
    .isString()
    .withMessage("Each tag must be a string")
    .trim(),

  body("subtasks")
    .optional()
    .isArray()
    .withMessage("Subtasks must be an array of objects"),
  body("subtasks.*.title")
    .optional()
    .notEmpty()
    .withMessage("Subtask title is required")
    .isString()
    .withMessage("Subtask title must be a string")
    .trim(),
  body("subtasks.*.completed")
    .optional()
    .isBoolean()
    .withMessage("Subtask completion status must be a boolean"),
];

export const todoIdValidator = [
  param("id")
    .isMongoId()

    .withMessage("Invalid Todo ID"),
];