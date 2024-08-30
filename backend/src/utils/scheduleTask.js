// /src/utils/scheduleTask.js
import cron from "node-cron";
import { gerarEscalaSemana } from "../services/escalaService.js";

// Configurar o agendamento para toda segunda-feira às 8h
cron.schedule("0 8 * * MON", async () => {
  console.log("Executando geração de escala semanal...");

  try {
    await gerarEscalaSemana();
    console.log("Escala semanal gerada com sucesso.");
  } catch (error) {
    console.error("Erro ao gerar a escala semanal:", error);
  }
});

console.log("Tarefa agendada para gerar escala semanal toda segunda-feira às 8h.");
