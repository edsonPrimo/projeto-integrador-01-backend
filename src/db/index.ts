import { globalConfig } from '../config';
import { getLogger } from '../utils/log';
import { DataSource } from 'typeorm';

let connection: DataSource;

export async function getDbConnection() {
  if (!connection) {
    connection = new DataSource({
      type: globalConfig.database.type
        ? (globalConfig.database.type as 'mysql')
        : (globalConfig.database.url.split(':')[0] as 'mysql'),
      entities: [__dirname + '/models/*.[tj]s'],
      synchronize: false,
      url: globalConfig.database.url,
      database:
        globalConfig.database.database ?? globalConfig.database.database,
      logging: globalConfig.database.log,
      connectTimeout: 30000,
      acquireTimeout: 30000,
      migrations: ['src/db/migrations/*.ts'],
    });
  }
  if (!connection.isInitialized) {
    await connection.initialize();
  }

  connection.runMigrations();
  return connection;
}
export function getManager() {
  return connection.manager;
}
export function getRepository(entityClass) {
  return connection.getRepository(entityClass);
}

export async function checkDbConnection() {
  const conn = await getDbConnection();
  getLogger().info(`DB connected: ${conn.isInitialized}`);
}
