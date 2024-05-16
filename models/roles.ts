"use strict";

import { Model } from "sequelize";
import { CONSTANT_MODEL } from "../helper/constant-model";
import { RoleAttribute } from "../interface/attributes";
import { v4 as uuidv4 } from "uuid";
import { RoleInput } from "../interface/input-attributes";

module.exports = (sequelize: any, DataTypes: any) => {
	class Roles extends Model<RoleAttribute, RoleInput> implements RoleAttribute {
		id!: string;
		roleName!: string;
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			const User = require("./user");
			const UserModel = User(sequelize);
			Roles.belongsTo(UserModel, { foreignKey: "userId" });
			UserModel.hasMany(Roles, { foreignKey: "userId" });
		}
	}
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
		},
		{
			sequelize,
			modelName: CONSTANT_MODEL.MODEL_NAME.ROLE,
			paranoid: true,
		}
	);
	return Roles;
};
