import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.post("/ride/estimate", async (req: Request, res: Response) => {
    const { customer_id, origin, destination } = req.body;

    // Validações básicas
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

    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
                origin
            )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`
        );

        const { routes } = response.data;
        if (routes.length === 0) {
            return res.status(400).json({
                error_code: "NO_ROUTE_FOUND",
                error_description: "Nenhuma rota encontrada entre os locais.",
            });
        }

        const route = routes[0];
        const { legs } = route;
        const { distance, duration } = legs[0];

        return res.status(200).json({
            origin,
            destination,
            distance: distance.text,
            duration: duration.text,
            message: "Cálculo de estimativa concluído com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao chamar a API do Google Maps:", error);
        return res.status(500).json({
            error_code: "INTERNAL_ERROR",
            error_description: "Erro ao processar a estimativa.",
        });
    }
});

export default router;
