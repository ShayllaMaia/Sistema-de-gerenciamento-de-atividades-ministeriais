import express from 'express';
import { errorHandler } from "./src/errors/appError.js";
import cors from "cors";
import "express-async-errors";
import { usersRoutes } from "./src/routes/users.routes.js";

//configuração para uso do express
const app = express();
const port = 3000;
//usando recursos no servidor
app.use(express.json());
app.use(errorHandler);//tratamento de erro
app.use(cors());
// rotas
app.use("/users", usersRoutes);


//iniciando o servidor
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});