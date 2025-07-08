import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "5d",
  });
};

export const verifyToken = (token: string): { id: number } => {
  return jwt.verify(token, JWT_SECRET) as { id: number };
};
