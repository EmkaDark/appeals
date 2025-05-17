"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appealRepository = void 0;
const appeal_entity_1 = require("../entity/appeal.entity");
const data_source_1 = require("../data-source");
exports.appealRepository = data_source_1.AppDataSource.getRepository(appeal_entity_1.Appeal);
