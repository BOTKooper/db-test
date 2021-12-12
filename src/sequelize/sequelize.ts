import { SEQUELIZE_CONFIG } from "../_config";

import { Sequelize } from 'sequelize-typescript';
import { UserActionModel } from "./model";


let connection: Sequelize;

export const getSequelizeConnection = async () => {
  if (connection) {
    return connection;
  }
  connection = await new Sequelize(SEQUELIZE_CONFIG);
  await connection.addModels([UserActionModel]);
  return connection;
}
