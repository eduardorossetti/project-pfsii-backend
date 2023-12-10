import { Router } from "express";
import TelefoneCTRL from "./controllers/TelefoneController.js";

const rotaTelefone = new Router();
const telefoneCtrl = new TelefoneCTRL();

rotaTelefone
  .post("/", telefoneCtrl.gravar)
  .put("/", telefoneCtrl.atualizar)
  .delete("/:codigo", telefoneCtrl.excluir)
  .get("/", telefoneCtrl.consultar);

export default rotaTelefone;
