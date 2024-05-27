import { Request, Response } from "express";
import db from "../models";
import { HTTP_RESPONSE } from "../helper/constant-response";
import {
	httpErrorResponse,
	httpSuccessResponse,
} from "../utils/http-common-utils";
import { UserAttributes } from "../interface/attributes";
import { v4 as uuidv4 } from "uuid";
import { pagination } from "../utils/http-common-utils";
import { Model, Op } from "sequelize";
import {
	SearchQueryHelper,
	SortQueryHelper,
	PaginationQueryBuilder,
} from "../helper/query-helper";

const { User, Role, Policy } = db;

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
		const page = parseInt(request.query.page as string) || 1;
		const pageSize = parseInt(request.query.size as string) || 25;
		const keywords = (request.query.keywords as string) || "";
		const search = SearchQueryHelper(keywords);
		const sort = SortQueryHelper;
		const offset = (page - 1) * pageSize;
		const queryBuilder = PaginationQueryBuilder(search, sort, offset, pageSize);
		const { count, rows } = await User.findAndCountAll(queryBuilder);
		const data = pagination(page, pageSize, count, rows);
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
 *  Method to fetch user list
 * @param request - request body
 * @param response - response body
 */
const GetArchiveUserList = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const page = parseInt(request.query.page as string) || 1;
		const pageSize = parseInt(request.query.size as string) || 25;
		const keywords = (request.query.keywords as string) || "";
		const search = SearchQueryHelper(keywords);
		const option = {
			...search,
			deletedAt: { [Op.ne]: null },
		};
		const sort = SortQueryHelper;
		const offset = (page - 1) * pageSize;
		const query = PaginationQueryBuilder(option, sort, offset, pageSize, false);
		const { count, rows } = await User.findAndCountAll(query);
		const data = pagination(page, pageSize, count, rows);
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
		console.log(id);

		const user = await User.findByPk(id, {
			include: {
				model: Role,
				include: {
					// Nested include for retrieving policies
					model: Policy,
					attributes: ["policyName", "isPolicyActive"],
				},
			},
		});
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
		const user = await User.create({
			id: uuidv4(),
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

/**
 *  Method to delete current user
 * @param request - request body / params
 * @param response - response body
 */
const DeletePermanentUser = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const user = await User.findByPk(id, { paranoid: false });
		if (!user) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}
		await user.destroy({ force: true });
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

/**
 *  Method to restore current user
 * @param request - request body / params
 * @param response - response body
 */
const RestoreUser = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const user = await User.findByPk(id, { paranoid: false });
		if (!user) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}
		await user.restore();
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

const AssignRoleToUser = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const { userId, roleId } = request.body;

	try {
		const user = await User.findByPk(userId, { include: Role });
		if (!user) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}

		const role = await Role.findByPk(roleId);
		if (!role) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}

		user.roleId = roleId;
		await user.save();

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
	GetUserList,
	CreateUser,
	UpdateUser,
	DeleteUser,
	GetUserById,
	GetArchiveUserList,
	RestoreUser,
	DeletePermanentUser,
	AssignRoleToUser,
};
