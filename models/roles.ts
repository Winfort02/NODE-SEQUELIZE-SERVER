"use strict";

import { Model, DataType } from "sequelize";
import { CONSTANT_MODEL } from "../helper/constant-model";
import { RoleAttribute } from "../interface/attributes";
import { v4 as uuidv4 } from "uuid";
import { RoleInput } from "../interface/input-attributes";

module.exports = (sequelize: any) => {
	class Roles extends Model<RoleAttribute, RoleInput> implements RoleAttribute {
		id!: string;
		roleName!: string;
		assignedUsers!: number[];
		assignedPolicies!: number[];
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
			Roles.belongsTo(models.User, { foreignKey: "userId" });
			Roles.hasMany(models.Policy, { foreignKey: "roleId" });
		}
	}
	const { DataTypes } = require("sequelize");

	Roles.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: uuidv4(),
				allowNull: true,
				primaryKey: true,
			},
			roleName: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			userId: {
				type: DataTypes.UUID,
				references: {
					model: "User",
					key: "id",
				},
			},
			assignedUsers: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: false,
				defaultValue: [],
			},
			assignedPolicies: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: false,
				defaultValue: [],
			},
		},
		{
			sequelize,
			modelName: CONSTANT_MODEL.MODEL_NAME.ROLE,
			paranoid: true,
		}
	);
	return Roles;
};
