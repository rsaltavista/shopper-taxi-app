"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/ride/estimate", (req, res) => {
    const { customer_id, origin, destination } = req.body;
    if (!customer_id || !origin || !destination) {
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Todos os campos são obrigatórios.",
        });
    }
    if (origin === destination) {
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "A origem e o destino não podem ser iguais.",
        });
    }
    return res.status(200).json({
        message: "Cálculo de estimativa implementado aqui futuramente!",
    });
});
exports.default = router;
