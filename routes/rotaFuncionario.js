import { Router } from "express";
import FuncionarioCTRL from "../controller/FuncionarioCtrl.js";

const rotaFuncionario = new Router();
const funcionarioCtrl = new FuncionarioCTRL();

rotaFuncionario
  .post("/", funcionarioCtrl.gravar)
  .put("/", funcionarioCtrl.atualizar)
  .delete("/:codigo", funcionarioCtrl.excluir)
  .get("/", funcionarioCtrl.consultar)
  .get("/:codigo", funcionarioCtrl.obterFuncionario)

  .get("/:codigo/atribuicao", funcionarioCtrl.obterAtribuicoes)
  .post("/:codigo/atribuicao", funcionarioCtrl.atribuir)
  .put("/:codigo/atribuicao", funcionarioCtrl.atualizarAtribuicoes)
  .delete("/:codigo/atribuicao", funcionarioCtrl.removerAtribuicao);

export default rotaFuncionario;
