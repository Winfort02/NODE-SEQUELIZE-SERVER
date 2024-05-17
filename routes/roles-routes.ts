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
 * Get all roles (requires authentication)
 */
router.get(
	API_ROUTES.ROLES.BASE,
	AuthenticationMiddleware,
	RolesController["GetRolesList"]
);

/**
 * Get role by ID (requires authentication)
 */
router.get(
	API_ROUTES.ROLES.BASE_WITH_ID,
	AuthenticationMiddleware,
	RolesController["GetRoleById"]
);

/**
 * Update role (requires authentication)
 */
router.patch(
	API_ROUTES.ROLES.BASE_WITH_ID,
	AuthenticationMiddleware,
	RolesController["UpdateRole"]
);

/**
 * Create role (requires authentication)
 */
router.post(
	API_ROUTES.ROLES.BASE,
	AuthenticationMiddleware,
	RolesController["CreateRole"]
);

/**
 * Delete role (requires authentication)
 */
router.delete(
	API_ROUTES.ROLES.DELETE_PERMANENT,
	AuthenticationMiddleware,
	RolesController["DeleteRole"]
);

/**
 * Get roles by user ID (requires authentication)
 */
router.get(
	`${API_ROUTES.ROLES.BASE}/:userId`,
	AuthenticationMiddleware,
	RolesController["GetRoleByUserId"]
);

/**
 * Assign user to a role (requires authentication)
 */
router.post(
	`${API_ROUTES.ROLES.BASE_WITH_ID}/assign-user`,
	AuthenticationMiddleware,
	RolesController["AssignRolesToUser"]
);

/**
 * Assign policy to a role (requires authentication)
 */
router.post(
	`${API_ROUTES.ROLES.BASE_WITH_ID}/assign-policy`,
	AuthenticationMiddleware,
	RolesController["AssignPolicyToRole"]
);

export default router;
