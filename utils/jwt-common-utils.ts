import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (payload: object) => {
  const options = {
    expiresIn: "8h",
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY as string, options);
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.TOKEN_SECRET_KEY as string);
};

export { generateToken, verifyToken };
