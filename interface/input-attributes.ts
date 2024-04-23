import { Optional } from "sequelize";
import { UserAttributes } from "./attributes";

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}
