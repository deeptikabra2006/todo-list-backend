import { validationResult } from "express-validator";

import AuthService from "../services/AuthService.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";

class AuthController {

  static register = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(400, "Validation Failed", errors.array());
    }

    const user = await AuthService.register(req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, user, "User Registered Successfully"));
  });

  static login = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(400, "Validation Failed", errors.array());
    }

    const data = await AuthService.login(req.body);

    return res.status(200).json(new ApiResponse(200, data, "Login Successful"));
  });

  static logout = AsyncHandler(async (req, res) => {
    const data = await AuthService.logout();
    return res.status(200).json(new ApiResponse(200, data, "Logout Successful"));
  });

  static profile = AsyncHandler(async (req, res) => {
    return res.status(200).json(
      new ApiResponse(
        200,

        req.user,

        "Profile fetched successfully",
      ),
    );
  });
}

export default AuthController;