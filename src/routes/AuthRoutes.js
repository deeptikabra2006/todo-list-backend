import express from "express";

import AuthController from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/AuthValidator.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  AuthController.register
);

router.post(
  "/login",
  loginValidator,
  AuthController.login
);

router.post(
  "/logout",
  verifyToken,
  AuthController.logout
);

router.get(
  "/profile",
  verifyToken,
  AuthController.profile
);

export default router;