import { Repository } from "typeorm";
import { Appeal } from "../entity/appeal.entity";
import { AppDataSource } from "../data-source";

export const appealRepository: Repository<Appeal> =
  AppDataSource.getRepository(Appeal);
