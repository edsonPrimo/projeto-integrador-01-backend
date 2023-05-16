import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export const globalConfig = {
  jwtSecret: '',
  port: 8000,
  database: {
    url: '',
    type: '',
    database: null,
    log: true,
  },
};

export function loadConfig() {
  const env = dotenv.config({
    path: process.env.ENV ? process.env.ENV : '.env',
  });
  dotenvExpand(env);

  globalConfig.port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
  globalConfig.database = {
    url: process.env.DB_URL,
    database: process.env.DB_DATABASE,
    type: 'mysql',
    log: true,
  };
  globalConfig.jwtSecret = process.env.JWT_SECRET;
}
