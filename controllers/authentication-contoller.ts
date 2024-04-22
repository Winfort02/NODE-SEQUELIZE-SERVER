import { Request, Response } from "express";
import db from "../models";
import { HTTP_RESPONSE } from "../helper/constant-response";
import {
  httpErrorResponse,
  httpSuccessResponse,
} from "../utils/http-common-utils";
import { SignInAttribute } from "../interface/attributes";
import { generateToken, verifyToken } from "../utils/jwt-common-utils";
import { AuthErrorHandler } from "./../utils/auth-common-utils";

const { User } = db;

const SignIn = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { email, password } = <SignInAttribute>request.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return AuthErrorHandler(
        response,
        HTTP_RESPONSE.STATUS.NOT_FOUND,
        "Email Not Found"
      );
    }
    const isAunthenticated = await user.authenticate(password);
    if (!isAunthenticated) {
      return AuthErrorHandler(
        response,
        HTTP_RESPONSE.STATUS.BAD_REQUEST,
        "Incorrect email or password. Please try agaian !"
      );
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
      userType: user.userType,
    });
    const decodedInfo = verifyToken(token);
    response.locals.token = decodedInfo;
    if (!decodedInfo) {
      return response.status(HTTP_RESPONSE.STATUS.UNAUTHORIZE).json({
        status: HTTP_RESPONSE.STATUS.UNAUTHORIZE,
        message: HTTP_RESPONSE.MESSAGES.UNAUTHORIZE,
      });
    }
    return httpSuccessResponse(
      HTTP_RESPONSE.STATUS.SUCCESS,
      HTTP_RESPONSE.MESSAGES.SUCCESS,
      { user, token: token },
      response
    );
  } catch (error) {
    console.log(error);
    return httpErrorResponse(
      HTTP_RESPONSE.STATUS.BAD_REQUEST,
      HTTP_RESPONSE.MESSAGES.BAD_REQUEST,
      error,
      response
    );
  }
};

export default {
  SignIn,
};
