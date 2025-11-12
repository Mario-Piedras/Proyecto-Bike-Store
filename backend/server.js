import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productosRoutes from "./src/routes/productos.routes.js";
import entrada_insumo from "./src/routes/entrada_insumo.routes.js";
import detalle_entrada from "./src/routes/detalle_entrada.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//Rutas
app.use("/api/productos", productosRoutes);
app.use("/api/entrada_insumo", entrada_insumo);
app.use("/api/detalle_entrada", detalle_entrada);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});