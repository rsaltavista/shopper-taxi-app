import express from "express";
import rideRoutes from "./routes/rideRoutes";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor está funcionando e pronto para receber requisições!");
});

app.use("/api", rideRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
