import express from "express";
import UserController from "./../controllers/user-controler";
import AuthenticationContoller from "../controllers/authentication-contoller";
import { API_ROUTES } from "../helper/constant-routes";
import { AuthenticationMiddleware } from "./../utils/middleware-common-utils";

/**
 * Instanciate express router
 */
const router = express.Router();

/**
 * Router - User List
 */
router.post(API_ROUTES.LOGIN.BASE, AuthenticationContoller["SignIn"]);

/**
 * Router - User List
 */
router.get(
  API_ROUTES.USER.BASE,
  AuthenticationMiddleware,
  UserController["GetUserList"]
);

/**
 * Router - Create new user
 */
router.post(
  API_ROUTES.USER.BASE,
  AuthenticationMiddleware,
  UserController["CreateUser"]
);

/**
 * Router - Get user info using id
 */
router.get(
  API_ROUTES.USER.BASE_WITH_ID,
  AuthenticationMiddleware,
  UserController["GetUserById"]
);

/**
 * Router - Update current user
 */
router.put(
  API_ROUTES.USER.BASE_WITH_ID,
  AuthenticationMiddleware,
  UserController["UpdateUser"]
);

/**
 * Router - Delete current user
 */
router.delete(
  API_ROUTES.USER.BASE_WITH_ID,
  AuthenticationMiddleware,
  UserController["DeleteUser"]
);

export default router;
