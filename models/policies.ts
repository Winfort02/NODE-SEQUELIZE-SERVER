"use strict";
import { Model } from "sequelize";
import { PolicyAttribute } from "../interface/attributes";
import { PolicyInput } from "../interface/input-attributes";
import { v4 as uuidv4 } from "uuid";
import { CONSTANT_MODEL } from "../helper/constant-model";

module.exports = (sequelize: any) => {
	class Policy
		extends Model<PolicyAttribute, PolicyInput>
		implements PolicyAttribute
	{
		id!: number;
		policyName!: string;
		canAdd!: boolean;
		canDelete!: boolean;
		canRestore!: boolean;
		canUpdate!: boolean;
		canView!: boolean;
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
			Policy.belongsToMany(models.Role, {
				through: "RolePolicy",
				onDelete: "RESTRICT",
				onUpdate: "RESTRICT",
			});
		}
	}
	const { DataTypes } = require("sequelize");

	Policy.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			policyName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			canAdd: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: false,
			},
			canDelete: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: false,
			},
			canUpdate: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: false,
			},
			canRestore: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: false,
			},
			canView: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: CONSTANT_MODEL.MODEL_NAME.POLICY,
			paranoid: false,
		}
	);
	return Policy;
};
