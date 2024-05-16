import express from "express";
import RolesController from "./../controllers/roles-controller";
// import AuthenticationController from "../controllers/authentication-contoller"
import { API_ROUTES } from "../helper/constant-routes";
import { AuthenticationMiddleware } from "../utils/middleware-common-utils";

/**
 * create instance of express router
 */
const router = express.Router();

/**
 * get all roles
 */
router.get(
	API_ROUTES.POLICIES.BASE,
	AuthenticationMiddleware,
	RolesController["GetRolesList"]
);

/**
 *  get roles by id
 */
router.get(
	API_ROUTES.POLICIES.BASE_WITH_ID,
	AuthenticationMiddleware,
	RolesController["GetRolesById"]
);

/**
 * update roles
 */
router.patch(
	API_ROUTES.POLICIES.BASE_WITH_ID,
	AuthenticationMiddleware,
	RolesController["UpdateRoles"]
);

/**
 * create roles
 */
router.post(
	API_ROUTES.POLICIES.BASE,
	AuthenticationMiddleware,
	RolesController["CreateRoles"]
);

/**
 * delete roles
 */
router.delete(
	API_ROUTES.POLICIES.DELETE_PERMANENT,
	AuthenticationMiddleware,
	RolesController["DeleteRoles"]
);

export default router;
