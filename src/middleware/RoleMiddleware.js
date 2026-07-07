import ApiError from "../utils/ApiError.js";

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access Denied");
    }

    next();
  };
};

export default allowRoles;