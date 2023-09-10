import express from "express";
import rotaFuncionario from "./routes/rotaFuncionario.js";
import rotaCargo from "./routes/rotaCargo.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: [
      "Accept-Version",
      "Authorization",
      "Credentials",
      "Content-Type",
    ],
  })
);

// Configurar a aplicação para aceitar objetos aninhados
app.use(express.urlencoded({ extended: false }));

app.use("/funcionarios", rotaFuncionario);
app.use("/cargos", rotaCargo);

const door = 4010;
const hostname = "0.0.0.0";

app.listen(door, hostname, () => {
  console.log("Server listening on http://" + hostname + ":" + door);
});
