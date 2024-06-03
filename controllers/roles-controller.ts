import { Request, Response } from "express";
import db from "../models";
import { HTTP_RESPONSE } from "../helper/constant-response";
import {
	httpErrorResponse,
	httpSuccessResponse,
} from "../utils/http-common-utils";
import { RoleAttribute } from "../interface/attributes";

const { Role, Policy, User } = db;

/**
 * method to get all roles
 */
const GetRolesList = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const data = await Role.findAll();
		return httpSuccessResponse(
			HTTP_RESPONSE.STATUS.SUCCESS,
			HTTP_RESPONSE.MESSAGES.SUCCESS,
			data,
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
 * method to get roles by user id
 * @param request
 * @param response
 * @returns
 */
const GetRoleByUserId = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { userId } = request.params;
		const roles = await Role.findByPk(userId);
		if (!roles) {
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
			roles,
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
 * method to get roles by id
 * @param request
 * @param response
 * @returns
 */
const GetRoleById = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const roles = await Role.findByPk(id, {
			include: {
				model: Policy,
				through: { attributes: [] },
			},
		});
		if (!roles) {
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
			roles,
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
 * method to create roles
 * @param request
 * @param response
 * @returns
 */
const CreateRole = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { roleName } = <RoleAttribute>request.body;
		const roles = await Role.create({
			roleName,
		});
		return httpSuccessResponse(
			HTTP_RESPONSE.STATUS.CREATED,
			HTTP_RESPONSE.MESSAGES.CREATED,
			roles,
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
 * method to update roles
 * @param request
 * @param response
 * @returns
 */
const UpdateRole = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const { roleName } = <RoleAttribute>request.body;
		const roles = await Role.findByPk(id);
		if (!roles) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}
		roles.rolesName = roleName;
		roles.save();
		return httpSuccessResponse(
			HTTP_RESPONSE.STATUS.UPDATED,
			HTTP_RESPONSE.MESSAGES.UPDATED,
			roles,
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
 *  method to delete current roles
 * @param request - request body / params
 * @param response - response body
 */
const DeleteRole = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const roles = await Role.findByPk(id);
		if (!roles) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}
		await roles.destroy();
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

const AssignPolicyToRole = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const { roleId, policyId, isPolicyActive } = request.body;
	try {
		const role = await Role.findByPk(roleId, { include: Policy });
		if (!role) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}

		const policy = await Policy.findByPk(policyId);

		if (!policy) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}

		await role.addPolicy(policy, {
			through: { isPolicyActive },
		});

		return httpSuccessResponse(
			HTTP_RESPONSE.STATUS.CREATED,
			HTTP_RESPONSE.MESSAGES.CREATED,
			{},
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
	GetRolesList,
	GetRoleByUserId,
	GetRoleById,
	CreateRole,
	DeleteRole,
	UpdateRole,
	AssignPolicyToRole,
};
