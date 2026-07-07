import Jwt from "../utils/Jwt.js";
import UserModel from "../models/UserModel.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const verifyToken = AsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  let decoded;

  try {
    decoded = Jwt.verifyToken(token);
  } catch {
    throw new ApiError(401, "Invalid or Expired Token");
  }

  const user = await UserModel.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;

  next();
});

export { verifyToken };