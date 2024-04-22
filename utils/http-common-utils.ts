import { Response } from "express";
import { HTTP_RESPONSE } from "../helper/constant-response";

export const httpSuccessResponse = (
  status: number,
  message: string,
  data: Array<object> | object,
  response: Response
): Response => {
  return response.status(status).json({ status, message, data });
};

export const httpErrorResponse = (
  status: number,
  message: string,
  errors: Array<any> | object | unknown,
  response: Response
): Response => {
  if (errors && errors instanceof Error) {
    return response.status(status).json({ status, message, errors });
  }
  return response.status(HTTP_RESPONSE.STATUS.SERVER_ERROR).json({
    status: HTTP_RESPONSE.STATUS.SERVER_ERROR,
    message: HTTP_RESPONSE.MESSAGES.SERVER_ERROR,
    errors,
  });
};
