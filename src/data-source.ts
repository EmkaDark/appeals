import dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
const isCompiled = __filename.endsWith(".js");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [isCompiled ? "entity/**/*.js" : "src/entity/**/*.ts"],
});
