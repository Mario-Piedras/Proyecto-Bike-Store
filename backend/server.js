import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productosRoutes from "./src/routes/productos.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//Rutas
app.use("/api/productos", productosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});