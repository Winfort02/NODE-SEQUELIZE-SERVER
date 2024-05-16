import express from "express";
import PolicyController from "./../controllers/policies-controller";
// import AuthenticationController from "../controllers/authentication-contoller"
import { API_ROUTES } from "../helper/constant-routes";
import { AuthenticationMiddleware } from "../utils/middleware-common-utils";

/**
 * create instance of express router
 */
const router = express.Router();

/**
 * get all policy
 */
router.get(
  API_ROUTES.POLICIES.BASE,
  AuthenticationMiddleware,
  PolicyController["GetPolicyList"]
);

/**
 *  get policy by id
 */
router.get(
  API_ROUTES.POLICIES.BASE_WITH_ID,
  AuthenticationMiddleware,
  PolicyController["GetPolicyById"]
);

/**
 * update policy
 */
router.patch(
  API_ROUTES.POLICIES.BASE_WITH_ID,
  AuthenticationMiddleware,
  PolicyController["UpdatePolicy"]
);

/**
 * create policy
 */
router.post(
  API_ROUTES.POLICIES.BASE,
  AuthenticationMiddleware,
  PolicyController["CreatePolicy"]
);

/**
 * delete policy
 */
router.delete(
  API_ROUTES.POLICIES.DELETE_PERMANENT,
  AuthenticationMiddleware,
  PolicyController["DeletePolicy"]
);

export default router;
