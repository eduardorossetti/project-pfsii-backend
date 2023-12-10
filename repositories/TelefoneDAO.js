import conectar from "./Conexao.js";
import Telefone from "../models/Telefone.js";

export default class TelefoneBD {
  constructor() {}

  async gravar(telefone) {
    if (telefone instanceof Telefone) {
      const conexao = await conectar();
      let conn = null;
      let lastInsertedId = null;

      try {
        conn = await conexao.getConnection();
        await conn.beginTransaction();

        const [response] = await conn.query(
          "INSERT INTO telefone(numero, pessoa_info_codigo) VALUES (?, ?)",
          [telefone.numero, telefone.pessoaId]
        );

        await conn.commit();

        lastInsertedId = response.insertId;
      } catch (error) {
        if (conn) await conn.rollback();
        throw error;
      } finally {
        if (conn) conn.release();
        return lastInsertedId;
      }
    }
  }

  async atualizar(telefone) {
    if (telefone instanceof Telefone) {
      const conexao = await conectar();
      let conn = null;

      try {
        conn = await conexao.getConnection();
        await conn.beginTransaction();

        await conn.query(
          "UPDATE telefone SET numero=?, pessoa_info_codigo=? WHERE codigo=?",
          [telefone.numero, telefone.pessoaId, telefone.codigo]
        );

        await conn.commit();
      } catch (error) {
        if (conn) await conn.rollback();
        throw error;
      } finally {
        if (conn) conn.release();
      }
    }
  }

  async excluir(telefone) {
    if (telefone instanceof Telefone) {
      const conexao = await conectar();
      let conn = null;

      try {
        conn = await conexao.getConnection();
        await conn.beginTransaction();

        await conn.query("DELETE FROM telefone WHERE codigo=?", telefone.codigo);
        await conn.commit();
      } catch (error) {
        if (conn) await conn.rollback();
        throw error;
      } finally {
        if (conn) conn.release();
      }
    }
  }

  async consultar() {
    const conexao = await conectar();

    const sql = `SELECT * FROM telefone`;

    const [rows] = await conexao.query(sql);

    const telefones = [];

    for (const row of rows) {
      const telefone = new Telefone(
        row["codigo"],
        row["numero"],
        row["pessoa_info_codigo"]
      );

      telefones.push(telefone);
    }
    return telefones;
  }
}
