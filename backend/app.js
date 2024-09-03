import express from 'express';
import { errorHandler } from "./src/errors/appError.js";
import cors from "cors";
import "express-async-errors";
import { usuarioRoutes } from './src/routes/usuario.routes.js';
import { loginRoutes } from './src/routes/login.routes.js';
import { ministerioRoutes } from './src/routes/ministerios.routes.js';
import { eventosRoutes } from './src/routes/eventos.routes.js';
import { escalaRoutes } from './src/routes/escalas.routes.js';
import { atividadeRoutes } from './src/routes/atividade.routes.js';
import { membroMinisterioRoutes } from './src/routes/membroMinisterio.routes.js';
import { ministerioLiderRoutes } from './src/routes/ministerioLider.routes.js';
import { validaToken } from './middlewares/validaToken.middlewares.js';
import expressListEndpoints from 'express-list-endpoints';
import { preferenciaHorariosRoutes } from './src/routes/preferenciaHorarios.routes.js';
import { preferenciaMembroRoutes } from './src/routes/preferenciaMembro.routes.js';




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
app.use("/escala",escalaRoutes)
app.use("/eventos",validaToken,eventosRoutes);
app.use("/ministerio",ministerioRoutes);
app.use("/atividade", validaToken,atividadeRoutes);
app.use("/membroMinisterio",membroMinisterioRoutes);
app.use("/ministerioLider",ministerioLiderRoutes);
app.use("/preferenciahorarios",preferenciaHorariosRoutes)
app.use("/preferencia",preferenciaMembroRoutes);



//iniciando o servidor
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});


const endpoints = expressListEndpoints(app);
console.log(endpoints);