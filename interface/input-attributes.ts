import { Optional } from "sequelize";
import { PolicyAttribute, RoleAttribute, UserAttributes } from "./attributes";

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}
export interface RoleInput extends Optional<RoleAttribute, "id"> {}
export interface RoleOutput extends Required<RoleAttribute> {}
export interface PolicyInput extends Optional<PolicyAttribute, "id"> {}
export interface PolicyOutput extends Required<PolicyAttribute> {}
