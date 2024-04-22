"use strict";

import mysql from "mysql2";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db: any = {};

/**
 * Connection with database
 * this will create database if not exist
 * @param config
 */
const initConnection = (config: any) => {
  // create db if it doesn't already exist
  const { host, port, username, password, database } = config;
  const connection = mysql.createConnection({
    host,
    port,
    user: username,
    password,
  });
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
};

let sequelize: any;
initConnection(config);
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach(async (file: any) => {
    // const importModel = await import(path.join(__dirname, file)).then(
    //   async (module) => await module.default(sequelize, Sequelize.DataTypes)
    // );
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
