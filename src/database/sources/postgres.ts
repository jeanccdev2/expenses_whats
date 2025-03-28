import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  synchronize: false,
  logging: false,
  entities: ["src/database/entities/*.ts"], // Ajuste para a pasta src
  migrations: ["src/database/migrations/*.ts"], // Ajuste para a pasta src
  logger: "advanced-console",
});
