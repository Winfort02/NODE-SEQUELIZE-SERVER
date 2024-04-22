import { verifyToken } from "./jwt-common-utils";
import { AuthErrorHandler } from "./../utils/auth-common-utils";
import { HTTP_RESPONSE } from "../helper/constant-response";
import { Request, Response, NextFunction } from "express";
export const AuthenticationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let token = request.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const user = verifyToken(token);
      if (user) response.locals.token = user;
    } else {
      response.locals.token = {};
      return AuthErrorHandler(
        response,
        HTTP_RESPONSE.STATUS.UNAUTHORIZE,
        HTTP_RESPONSE.MESSAGES.UNAUTHORIZE
      );
    }
    next();
  } catch (error) {
    return AuthErrorHandler(
      response,
      HTTP_RESPONSE.STATUS.UNAUTHORIZE,
      HTTP_RESPONSE.MESSAGES.UNAUTHORIZE
    );
  }
};
