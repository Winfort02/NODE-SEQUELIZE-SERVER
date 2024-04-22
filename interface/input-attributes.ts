import { Optional } from "sequelize";
import { HistoryAttribute, UserAttributes } from "./attributes";

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}
export interface HistoryInput extends Optional<HistoryAttribute, "id"> {}
export interface HistoryOutput extends Required<HistoryAttribute> {}
