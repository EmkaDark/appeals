"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use("/", routes_1.default);
app.get("/", (req, res) => {
    res.json({ message: "i's work" });
});
function start() {
    try {
        data_source_1.AppDataSource.initialize()
            .then(() => console.log("bd connected"))
            .catch((err) => console.log("db connecting error", err));
        app.listen(PORT, () => {
            console.log(`[server] -- listening in http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
