"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppealController = void 0;
const typeorm_1 = require("typeorm");
const appeal_entity_1 = require("../entity/appeal.entity");
const appeal_repository_1 = require("../repositories/appeal.repository");
class AppealController {
    static getAppeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, start, end } = req.query;
                const selectedDate = new Date(date);
                const startDate = new Date(start);
                const endDate = new Date(end);
                const nextDay = new Date(selectedDate);
                nextDay.setDate(nextDay.getDate() + 1);
                if (date) {
                    const appeal = yield appeal_repository_1.appealRepository.find({
                        where: {
                            created_at: (0, typeorm_1.Between)(selectedDate, new Date(nextDay.getTime() - 1)),
                        },
                    });
                    res.status(200).json(appeal);
                    return;
                }
                if (start && end) {
                    const appeals = yield appeal_repository_1.appealRepository.find({
                        where: { created_at: (0, typeorm_1.Between)(startDate, endDate) },
                    });
                    res.status(200).json(appeals);
                    return;
                }
                const appeals = yield appeal_repository_1.appealRepository.find();
                res.status(200).json(appeals);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Ошибка чтения данных" });
            }
        });
    }
    static createAppeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text } = req.body;
            try {
                const appeal = new appeal_entity_1.Appeal();
                appeal.text = text;
                yield appeal_repository_1.appealRepository.save(appeal);
                res.status(201).json({ appeal, message: "Обращение создано" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Ошибка при создании обращения" });
            }
        });
    }
    static startWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const appeal = yield appeal_repository_1.appealRepository.findOne({ where: { id } });
                if (!appeal) {
                    res.status(404).json({ error: "Обращение не найдено!" });
                    return;
                }
                if (appeal.status === appeal_entity_1.AppealStatus.IN_PROGRESS) {
                    res
                        .status(200)
                        .json({ message: 'Обращение уже в статусе "В процессе"' });
                }
                appeal.status = appeal_entity_1.AppealStatus.IN_PROGRESS;
                yield appeal_repository_1.appealRepository.save(appeal);
                res.status(200).json({ appeal, message: "Обращение взято в работу" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Ошибка при обновлении статуса" });
            }
        });
    }
    static endAppeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { text } = req.body;
                const appeal = yield appeal_repository_1.appealRepository.findOne({ where: { id } });
                if (!appeal) {
                    res.status(404).json({ error: "Обращение не найдено" });
                    return;
                }
                appeal.status = appeal_entity_1.AppealStatus.COMPLETED;
                appeal.resolution = text;
                yield appeal_repository_1.appealRepository.save(appeal);
                res.status(200).json({ appeal, message: "Обращение завершено" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Ошибка при завершении обращеия " });
            }
        });
    }
    static cancelAppeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { text } = req.body;
                const appeal = yield appeal_repository_1.appealRepository.findOne({ where: { id } });
                if (!appeal) {
                    res.status(404).json({ message: "Обращение не найдено" });
                    return;
                }
                appeal.resolution = text;
                appeal.status = appeal_entity_1.AppealStatus.CANCELED;
                yield appeal_repository_1.appealRepository.save(appeal);
                res.status(200).json({ appeal, message: "Обращение отменено" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Ошибка отмены обращения" });
            }
        });
    }
    static cancelAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appeals = yield appeal_repository_1.appealRepository.find({
                    where: { status: appeal_entity_1.AppealStatus.IN_PROGRESS },
                });
                if (appeals.length === 0) {
                    res
                        .status(404)
                        .json({ message: 'Обращение в статусе "в работе" отсутствуют' });
                }
                yield appeal_repository_1.appealRepository.update({
                    status: appeal_entity_1.AppealStatus.IN_PROGRESS,
                }, { status: appeal_entity_1.AppealStatus.CANCELED });
                const updateAppeals = yield appeal_repository_1.appealRepository.find({
                    where: { status: appeal_entity_1.AppealStatus.CANCELED },
                });
                res.status(200).json({ updateAppeals, message: "Обращения отменены" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Ошибка отмены обращений" });
            }
        });
    }
}
exports.AppealController = AppealController;
