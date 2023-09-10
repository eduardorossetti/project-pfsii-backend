import Cargo from "../model/Cargo.js";
import conectar from "./Conexao.js";

export default class CargoBD {
  constructor() {}

  async gravar(cargo) {
    if (cargo instanceof Cargo) {
      const conexao = await conectar();

      const sql = "INSERT INTO cargo(nome,descricao) VALUES (?,?)";
      const parametros = [cargo.nome, cargo.descricao];
      await conexao.query(sql, parametros);
    }
  }

  async alterar(cargo) {
    if (cargo instanceof Cargo) {
      const conexao = await conectar();

      const sql = "UPDATE cargo SET nome=?, descricao=? WHERE codigo=?";
      const parametros = [cargo.nome, cargo.descricao, cargo.codigo];
      await conexao.query(sql, parametros);
    }
  }

  async excluir(cargo) {
    if (cargo instanceof Cargo) {
      const conexao = await conectar();
      const sql = "DELETE FROM cargo WHERE codigo=?";
      await conexao.query(sql, cargo.codigo);
    }
  }

  async consultar() {
    const conexao = await conectar();

    const sql = "SELECT * FROM cargo ORDER BY nome";
    const [response] = await conexao.query(sql);

    const listaCargo = [];
    for (const row of response) {
      const cargo = new Cargo(row["codigo"], row["nome"], row["descricao"]);
      listaCargo.push(cargo);
    }
    return listaCargo;
  }
}
