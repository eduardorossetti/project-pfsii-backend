import { Router } from "express";
import CargoCTRL from "../controller/CargoCtrl.js";

const rotaCargo = new Router();
const cargoCtrl = new CargoCTRL();

rotaCargo
  .post("/", cargoCtrl.gravar)
  .put("/", cargoCtrl.atualizar)
  .delete("/:codigo", cargoCtrl.excluir)
  .get("/", cargoCtrl.consultar)

export default rotaCargo;
