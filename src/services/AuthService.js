import Jwt from "../utils/Jwt.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/UserModel.js";

class AuthService {
  static async register(data) {
    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }

    const user = await User.create(data);

    return user;
  }

  static async login(data) {
    const user = await User.findOne({
      email: data.email,
    }).select("+password");

    if (!user) {
      throw new ApiError(
        401,

        "Invalid Email or Password",
      );
    }

    const isPasswordCorrect = await user.comparePassword(data.password);

    if (!isPasswordCorrect) {
      throw new ApiError(
        401,

        "Invalid Email or Password",
      );
    }

    const token = Jwt.generateToken({
      id: user._id,

      email: user.email,

      role: user.role,
    });

    user.password = undefined;

    return {
      user,

      token,
    };
  }

  static async logout() {
    return {
      message: "Logged out successfully",
    };
  }
}

export default AuthService;