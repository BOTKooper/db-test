export const MONGO_CONFIG = {
  host: 'mongodb://localhost:27017',
  db: 'test',
};




export const SEQUELIZE_CONFIG = {
  dialect: 'postgresql' as any,
  synchronize: true,
  logging: false,
  database: 'yubbi-matcher-copy',
  port: 5432,
  host: 'localhost',
  username: 'yubbi',
  password: 'password',
  autoLoadModels: true,
};
