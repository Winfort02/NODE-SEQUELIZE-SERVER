import { Request, Response } from "express";
import db from "../models";
import { HTTP_RESPONSE } from "../helper/constant-response";
import {
	httpErrorResponse,
	httpSuccessResponse,
} from "../utils/http-common-utils";
import { RoleAttribute } from "../interface/attributes";
import { v4 as uuidv4 } from "uuid";

const { Roles } = db;

/**
 * method to get all roles
 */
const GetRolesList = async (response: Response): Promise<Response> => {
	try {
		const data = await Roles;
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
 * method to get roles by id
 * @param request
 * @param response
 * @returns
 */
const GetRolesById = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const roles = await Roles.findByPk(id);
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
 * method to create roles
 * @param request
 * @param response
 * @returns
 */
const CreateRoles = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { roleName } = <RoleAttribute>request.body;
		const roles = await Roles.create({
			id: uuidv4(),
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
const UpdateRoles = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const { roleName } = <RoleAttribute>request.body;
		const roles = await Roles.findByPk(id);
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
const DeleteRoles = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const roles = await Roles.findByPk(id);
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

export default {
	GetRolesList,
	GetRolesById,
	CreateRoles,
	DeleteRoles,
	UpdateRoles,
};
