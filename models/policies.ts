"use strict";
import { Model } from "sequelize";
import { PolicyAttribute } from "../interface/attributes";
import { PolicyInput } from "../interface/input-attributes";
import { v4 as uuidv4 } from "uuid";
import { CONSTANT_MODEL } from "../helper/constant-model";

module.exports = (sequelize: any, DataTypes: any) => {
  class policies
    extends Model<PolicyAttribute, PolicyInput>
    implements PolicyAttribute
  {
    id!: string;
    policyName!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: Model) {
      // define association here
    }
  }
  policies.init(
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
    },
    {
      sequelize,
      modelName: CONSTANT_MODEL.MODEL_NAME.POLICY,
      paranoid: true,
    }
  );
  return policies;
};
