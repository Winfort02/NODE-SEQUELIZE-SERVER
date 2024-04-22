import { Request, Response } from "express";
import db from "../models";
import { HTTP_RESPONSE } from "../helper/constant-response";
import {
  httpErrorResponse,
  httpSuccessResponse,
} from "../utils/http-common-utils";
import { UserAttributes } from "../interface/attributes";

const { User } = db;

/**
 *  Method to fetch user list
 * @param request - request body
 * @param response - response body
 */
const GetUserList = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const users: UserAttributes[] = await User.findAll({ paranoid: true });
    return httpSuccessResponse(
      HTTP_RESPONSE.STATUS.SUCCESS,
      HTTP_RESPONSE.MESSAGES.SUCCESS,
      users,
      response
    );
  } catch (error) {
    return httpErrorResponse(
      HTTP_RESPONSE.STATUS.BAD_REQUEST,
      HTTP_RESPONSE.MESSAGES.BAD_REQUEST,
      error,
      response
    );
  }
};

/**
 *  Method to get user info
 * @param request - request body / params
 * @param response - response body
 */
const GetUserById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { id } = request.params;
    const user = await User.findByPk(id);
    if (!user) {
      return httpErrorResponse(
        HTTP_RESPONSE.STATUS.NOT_FOUND,
        HTTP_RESPONSE.MESSAGES.NOT_FOUND,
        {},
        response
      );
    }
    return httpSuccessResponse(
      HTTP_RESPONSE.STATUS.SUCCESS,
      HTTP_RESPONSE.MESSAGES.SUCCESS,
      user,
      response
    );
  } catch (error) {
    return httpErrorResponse(
      HTTP_RESPONSE.STATUS.BAD_REQUEST,
      HTTP_RESPONSE.MESSAGES.BAD_REQUEST,
      error,
      response
    );
  }
};

/**
 *  Method to create new user
 * @param request - request body / params
 * @param response - response body
 */
const CreateUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name, username, userType, email, password } = <UserAttributes>(
      request.body
    );
    const user: UserAttributes = await User.create({
      name,
      username,
      userType,
      email,
      password,
    });
    return httpSuccessResponse(
      HTTP_RESPONSE.STATUS.CREATED,
      HTTP_RESPONSE.MESSAGES.CREATED,
      user,
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

/**
 *  Method to update current user
 * @param request - request body / params
 * @param response - response body
 */
const UpdateUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { id } = request.params;
    const { name, username, userType, email } = <UserAttributes>request.body;
    const user = await User.findByPk(id);
    if (!user) {
      return httpErrorResponse(
        HTTP_RESPONSE.STATUS.NOT_FOUND,
        HTTP_RESPONSE.MESSAGES.NOT_FOUND,
        {},
        response
      );
    }
    user.name = name;
    user.username = username;
    user.userType = userType;
    user.email = email;
    user.save();
    return httpSuccessResponse(
      HTTP_RESPONSE.STATUS.UPDATED,
      HTTP_RESPONSE.MESSAGES.UPDATED,
      user,
      response
    );
  } catch (error) {
    return httpErrorResponse(
      HTTP_RESPONSE.STATUS.BAD_REQUEST,
      HTTP_RESPONSE.MESSAGES.BAD_REQUEST,
      error,
      response
    );
  }
};

/**
 *  Method to delete current user
 * @param request - request body / params
 * @param response - response body
 */
const DeleteUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { id } = request.params;
    const user = await User.findByPk(id);
    if (!user) {
      return httpErrorResponse(
        HTTP_RESPONSE.STATUS.NOT_FOUND,
        HTTP_RESPONSE.MESSAGES.NOT_FOUND,
        {},
        response
      );
    }
    await user.destroy();
    return httpSuccessResponse(
      HTTP_RESPONSE.STATUS.NO_CONTENT,
      HTTP_RESPONSE.MESSAGES.NO_CONTENT,
      {},
      response
    );
  } catch (error) {
    return httpErrorResponse(
      HTTP_RESPONSE.STATUS.BAD_REQUEST,
      HTTP_RESPONSE.MESSAGES.BAD_REQUEST,
      error,
      response
    );
  }
};

export default {
  GetUserList,
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetUserById,
};
