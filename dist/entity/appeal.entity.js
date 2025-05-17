"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appeal = exports.AppealStatus = void 0;
const typeorm_1 = require("typeorm");
var AppealStatus;
(function (AppealStatus) {
    AppealStatus["PENDING"] = "pending";
    AppealStatus["IN_PROGRESS"] = "\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435";
    AppealStatus["COMPLETED"] = "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E";
    AppealStatus["CANCELED"] = "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u043E";
})(AppealStatus || (exports.AppealStatus = AppealStatus = {}));
let Appeal = class Appeal {
};
exports.Appeal = Appeal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Appeal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Appeal.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AppealStatus, default: AppealStatus.PENDING }),
    __metadata("design:type", String)
], Appeal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], Appeal.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], Appeal.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Appeal.prototype, "resolution", void 0);
exports.Appeal = Appeal = __decorate([
    (0, typeorm_1.Entity)()
], Appeal);
