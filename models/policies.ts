"use strict";
import { Model } from "sequelize";
import { PolicyAttribute } from "../interface/attributes";
import { PolicyInput } from "../interface/input-attributes";
import { v4 as uuidv4 } from "uuid";
import { CONSTANT_MODEL } from "../helper/constant-model";

module.exports = (sequelize: any, DataTypes: any) => {
	class Policies
		extends Model<PolicyAttribute, PolicyInput>
		implements PolicyAttribute
	{
		id!: string;
		policyName!: string;
		isPolicyActive!: boolean;
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			const Roles = require("./roles");
			const RolesModel = Roles(sequelize);
			Policies.belongsTo(RolesModel, { foreignKey: "roleId" });
		}
	}
	Policies.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: uuidv4(),
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
			policyName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isPolicyActive: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: CONSTANT_MODEL.MODEL_NAME.POLICY,
			paranoid: true,
		}
	);
	return Policies;
};
