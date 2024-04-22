import { Response } from "express";

export const AuthErrorHandler = (
  response: Response,
  status: number,
  message: string
) => {
  return response.status(status).json({ status, message });
};
