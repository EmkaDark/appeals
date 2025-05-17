"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appeal_route_1 = __importDefault(require("./appeal.route"));
const router = (0, express_1.Router)();
router.use("/api", appeal_route_1.default);
exports.default = router;
