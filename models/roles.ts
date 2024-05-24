"use strict";

import { Model, DataType } from "sequelize";
import { CONSTANT_MODEL } from "../helper/constant-model";
import { RoleAttribute } from "../interface/attributes";
import { v4 as uuidv4 } from "uuid";
import { RoleInput } from "../interface/input-attributes";

module.exports = (sequelize: any) => {
	class Role extends Model<RoleAttribute, RoleInput> implements RoleAttribute {
		id!: number;
		roleName!: string;
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
			Role.hasMany(models.User);
			Role.belongsToMany(models.Policy, {
				through: "RolePolicy",
				onDelete: "RESTRICT",
				onUpdate: "RESTRICT",
			});
		}
	}
	const { DataTypes } = require("sequelize");

	Role.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			roleName: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{
			sequelize,
			modelName: CONSTANT_MODEL.MODEL_NAME.ROLE,
			paranoid: false,
		}
	);
	return Role;
};
