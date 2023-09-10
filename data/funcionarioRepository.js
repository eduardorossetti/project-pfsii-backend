import Funcionario from "../models/funcionarioModel.js";
import conectar from "./Conexao.js";
import Cargo from "../models/cargoModel.js";

export default class FuncionarioBD {
  constructor() {}

  async gravar(funcionario) {
    if (funcionario instanceof Funcionario) {
      const conexao = await conectar();
      let conn = null;
      let lastInsertedId = null;

      try {
        conn = await conexao.getConnection();
        await conn.beginTransaction();
        const [response, meta] = await conn.query(
          "INSERT INTO pessoa (nome, telefone, email, endereco, \
            bairro, cidade, cep, uf) VALUES (?,?,?,?,?,?,?,?)",
          [
            funcionario.nome,
            funcionario.telefone,
            funcionario.email,
            funcionario.endereco,
            funcionario.bairro,
            funcionario.cidade,
            funcionario.cep,
            funcionario.uf,
          ]
        );
        const [response1, meta1] = await conn.query(
          "INSERT INTO funcionario (cpf,dt_nasc,dt_admissao,dt_demissao,status,nome_usuario,\
            senha_usuario,cargo_codigo,Pessoa_codigo) VALUES (?,?,?,?,?,?,?,?,?)",
          [
            funcionario.cpf,
            funcionario.dataNascimento,
            funcionario.dataAdmissao,
            funcionario.dataDemissao,
            funcionario.status,
            funcionario.nomeUsuario,
            funcionario.senhaUsuario,
            funcionario.cargo.codigo,
            response.insertId,
          ]
        );

        await conn.commit();

        lastInsertedId = response1.insertId;
      } catch (error) {
        if (conn) await conn.rollback();
        throw error;
      } finally {
        if (conn) conn.release();
        return lastInsertedId;
      }
    }
  }

  async atualizar(funcionario) {
    if (funcionario instanceof Funcionario) {
      const conexao = await conectar();
      let conn = null;

      try {
        conn = await conexao.getConnection();
        await conn.beginTransaction();

        const [response, meta] = await conn.query(
          "SELECT Pessoa_codigo FROM funcionario WHERE codigo=?",
          funcionario.codigo
        );

        await conn.query(
          "UPDATE pessoa SET nome=?, telefone=?, email=?, endereco=?, bairro=?, cidade=?,\
          cep=?, uf=? WHERE codigo=?",
          [
            funcionario.nome,
            funcionario.telefone,
            funcionario.email,
            funcionario.endereco,
            funcionario.bairro,
            funcionario.cidade,
            funcionario.cep,
            funcionario.uf,
            response[0].Pessoa_codigo,
          ]
        );
        await conn.query(
          "UPDATE funcionario SET cpf=?,dt_nasc=?,dt_admissao=?\
          ,dt_demissao=?,status=?,nome_usuario=?,senha_usuario=?,cargo_codigo=? WHERE codigo=?",
          [
            funcionario.cpf,
            funcionario.dataNascimento,
            funcionario.dataAdmissao,
            funcionario.dataDemissao,
            funcionario.status,
            funcionario.nomeUsuario,
            funcionario.senhaUsuario,
            funcionario.cargo.codigo,
            funcionario.codigo,
          ]
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

  async excluir(funcionario) {
    if (funcionario instanceof Funcionario) {
      const conexao = await conectar();
      let conn = null;

      try {
        conn = await conexao.getConnection();
        await conn.beginTransaction();

        const [response, meta] = await conn.query(
          "SELECT Pessoa_codigo FROM funcionario WHERE codigo=?",
          funcionario.codigo
        );

        await conn.query(
          "DELETE FROM funcionario WHERE codigo=?",
          funcionario.codigo
        );

        await conn.query(
          "DELETE FROM pessoa WHERE codigo=?",
          response[0].Pessoa_codigo
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

  async consultar() {
    const conexao = await conectar();

    const sql =
      "select f.codigo, p.nome, p.telefone, p.email, p.endereco, p.bairro, \
      p.cidade, p.cep, p.uf, f.cpf, f.dt_nasc, f.dt_admissao, f.dt_demissao, \
      f.status, f.nome_usuario, f.senha_usuario, f.Cargo_codigo, c.nome as cargo_nome \
      from pessoa p \
      INNER JOIN funcionario f \
      ON f.Pessoa_codigo = p.codigo \
      INNER JOIN cargo c \
      ON c.codigo = f.Cargo_codigo \
      ORDER BY p.nome";
    const [response] = await conexao.query(sql);

    const funcionarios = [];

    for (const row of response) {
      const cargo = new Cargo(row["Cargo_codigo"], row["cargo_nome"]);

      const funcionario = new Funcionario(
        row["codigo"],
        row["nome"],
        row["cpf"],
        row["dt_nasc"],
        row["dt_admissao"],
        row["dt_demissao"],
        row["status"],
        row["nome_usuario"],
        row["senha_usuario"],
        cargo,
        row["telefone"],
        row["email"],
        row["endereco"],
        row["bairro"],
        row["cidade"],
        row["cep"],
        row["uf"]
      );
      funcionarios.push(funcionario);
    }
    return funcionarios;
  }

  async consultarCargo(termo) {
    const conexao = await conectar();

    const sql =
      "select f.codigo, p.nome, p.telefone, p.email, p.endereco, p.bairro, \
      p.cidade, p.cep, p.uf, f.codigo as codigo_funcionario, f.cpf, f.dt_nasc, f.dt_admissao, f.dt_demissao, \
      f.status, f.nome_usuario, f.senha_usuario, f.Cargo_codigo, c.nome as cargo_nome \
      from pessoa p \
      INNER JOIN funcionario f \
      ON f.Pessoa_codigo = p.codigo \
      INNER JOIN cargo c \
      ON c.codigo = f.Cargo_codigo \
      WHERE c.nome LIKE (?) \
      ORDER BY p.nome";

    const params = ["%" + termo + "%"];
    const [response] = await conexao.query(sql, params);
    return response;
  }
}
