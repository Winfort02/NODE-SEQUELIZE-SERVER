"use strict";
import { Model, UUIDV4 } from "sequelize";
import { HistoryAttribute } from "../interface/attributes";
import { CONSTANT_MODEL } from "../helper/constant-model";
import { HistoryInput } from "../interface/input-attributes";

module.exports = (sequelize: any, DataTypes: any) => {
  class History
    extends Model<HistoryAttribute, HistoryInput>
    implements HistoryAttribute
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    action!: string;
    static associate(models: any) {
      // define association here
      History.belongsTo(models.User, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    }
  }

  History.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      action: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: CONSTANT_MODEL.MODEL_NAME.HISTORY,
      paranoid: true,
    }
  );
  return History;
};
