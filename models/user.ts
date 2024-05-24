"use strict";
import { Model } from "sequelize";
import { UserAttributes } from "../interface/attributes";
import { CONSTANT_MODEL } from "../helper/constant-model";
import { UserInput } from "../interface/input-attributes";

const useBcrypt = require("sequelize-bcrypt");

const PROTECTED_ATTRIBUTES = ["password"];

const bcryptOption = {
	field: "password",
	round: 12,
	compare: "authenticate",
};

module.exports = (sequelize: any) => {
	class User
		extends Model<UserAttributes, UserInput>
		implements UserAttributes
	{
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		id!: string;
		name!: string;
		email!: string;
		username!: string;
		userType!: number;
		password!: string;
		roleId!: number;

		toJSON() {
			// hide protected fields
			let attributes: any = Object.assign({}, this.get());
			for (let a of PROTECTED_ATTRIBUTES) {
				delete attributes[a];
			}
			return attributes;
		}

		static associate(models: any) {
			User.belongsTo(models.Role);
			// define association here
			// user associationg with services models
			// User.belongsToMany(models, {
			//   through: "HistoryAssignments",
			//   onDelete: "RESTRICT",
			//   onUpdate: "RESTRICT",
			// });
		}
	}
	const { DataTypes } = require("sequelize");

	User.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			username: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: true,
			},
			userType: {
				type: DataTypes.TINYINT,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			roleId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "Roles",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: CONSTANT_MODEL.MODEL_NAME.USER,
			paranoid: true,
		}
	);
	useBcrypt(User, bcryptOption);
	return User;
};
