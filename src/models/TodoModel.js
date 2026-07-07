import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      required: true,

      trim: true,

      maxlength: 100,
    },

    description: {
      type: String,

      default: "",

      trim: true,

      maxlength: 500,
    },

    status: {
      type: String,

      enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],

      default: "PENDING",
    },

    priority: {
      type: String,

      enum: ["LOW", "MEDIUM", "HIGH"],

      default: "MEDIUM",
    },

    dueDate: {
      type: Date,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    subtasks: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  },
);

const Todo = mongoose.model(
  "Todo",

  todoSchema,
);

export default Todo;