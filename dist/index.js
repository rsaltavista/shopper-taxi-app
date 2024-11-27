"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rideRoutes_1 = __importDefault(require("./routes/rideRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", rideRoutes_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
