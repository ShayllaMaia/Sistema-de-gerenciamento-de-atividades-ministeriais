import express from 'express';
import { errorHandler } from "./src/errors/appError.js";
import cors from "cors";
import "express-async-errors";
import { usuarioRoutes } from './src/routes/usuario.routes.js';
import { loginRoutes } from './src/routes/login.routes.js';



//configuração para uso do express
const app = express();
const port = 3200;
//usando recursos no servidor
app.use(express.json());
app.use(errorHandler);//tratamento de erro
app.use(cors());
// rotas
app.use("/usuario",usuarioRoutes);
app.use("/login",loginRoutes);


//iniciando o servidor
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});