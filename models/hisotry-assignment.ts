"use strict";
import { Model } from "sequelize";
import { HistoryAssingmentAttribute } from "../interface/attributes";
import { CONSTANT_MODEL } from "../helper/constant-model";

module.exports = (sequelize: any, DataTypes: any) => {
  class HistoryAssignment
    extends Model<HistoryAssingmentAttribute>
    implements HistoryAssingmentAttribute
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    historyId!: string;
    userId!: string;
    static associate(models: any) {
      // define association here
    }
  }
  HistoryAssignment.init(
    {
      historyId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: CONSTANT_MODEL.MODEL_NAME.HISTORY,
          key: "id",
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: CONSTANT_MODEL.MODEL_NAME.USER,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: CONSTANT_MODEL.MODEL_NAME.HISTORY_ASSIGN,
    }
  );
  return HistoryAssignment;
};
