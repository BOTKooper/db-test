import { MONGO_CONFIG } from "../_config";
import mongoose from 'mongoose';


let connection: typeof mongoose;

export const getMongoConnection = async () => {
  if (connection) {
    return connection;
  }
  connection = await mongoose.connect(`${MONGO_CONFIG.host}/${MONGO_CONFIG.db}`);
  return connection;
}

