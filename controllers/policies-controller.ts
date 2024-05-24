import { Request, Response } from "express";
import db from "../models";
import { HTTP_RESPONSE } from "../helper/constant-response";
import {
	httpErrorResponse,
	httpSuccessResponse,
} from "../utils/http-common-utils";
import { PolicyAttribute } from "../interface/attributes";
import { v4 as uuidv4 } from "uuid";

const { Policy } = db;

/**
 * method to get all policy
 */
const GetPolicyList = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const data = await Policy.findAll();
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
 * method to get policy by id
 * @param request
 * @param response
 * @returns
 */
const GetPolicyById = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const policy = await Policy.findByPk(id);
		if (!policy) {
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
			policy,
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
 * method to create policy
 * @param request
 * @param response
 * @returns
 */
const CreatePolicy = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { policyName, isPolicyActive } = <PolicyAttribute>request.body;
		const policy = await Policy.create({
			policyName,
			isPolicyActive,
		});
		return httpSuccessResponse(
			HTTP_RESPONSE.STATUS.CREATED,
			HTTP_RESPONSE.MESSAGES.CREATED,
			policy,
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
 * method to update policy
 * @param request
 * @param response
 * @returns
 */
const UpdatePolicy = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const { policyName, isPolicyActive } = <PolicyAttribute>request.body;
		const policy = await Policy.findByPk(id);
		if (!policy) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}
		policy.policyName = policyName;
		policy.isPolicyActive = isPolicyActive;
		policy.save();
		return httpSuccessResponse(
			HTTP_RESPONSE.STATUS.UPDATED,
			HTTP_RESPONSE.MESSAGES.UPDATED,
			policy,
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
 *  method to delete current policy
 * @param request - request body / params
 * @param response - response body
 */
const DeletePolicy = async (
	request: Request,
	response: Response
): Promise<Response> => {
	try {
		const { id } = request.params;
		const policy = await Policy.findByPk(id);
		if (!policy) {
			return httpErrorResponse(
				HTTP_RESPONSE.STATUS.NOT_FOUND,
				HTTP_RESPONSE.MESSAGES.NOT_FOUND,
				{},
				response
			);
		}
		await policy.destroy();
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
	GetPolicyList,
	GetPolicyById,
	CreatePolicy,
	DeletePolicy,
	UpdatePolicy,
};
