import jwt from "jsonwebtoken";

class Jwt {
  static generateToken(payload) {
    return jwt.sign(
      payload,

      process.env.JWT_SECRET,

      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }

  static verifyToken(token) {
    return jwt.verify(
      token,

      process.env.JWT_SECRET,
    );
  }
}

export default Jwt;