import Funcionario from "../model/Funcionario.js";
import conectar from "./Conexao.js";

export default class FuncionarioBD {
  constructor() {}

  async gravar(funcionario) {
    if (funcionario instanceof Funcionario) {
      const conexao = await conectar();
      let conn = null;

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
        await conn.query(
          "INSERT INTO funcionario (cpf,dt_nasc,dt_admissao,dt_demissao,status,nome_usuario,\
            senha_usuario,cargo_codigo,Pessoa_codigo) VALUES (?,?,?,?,?,?,?,?,?)",
          [
            funcionario.cpf,
            funcionario.dt_nasc,
            funcionario.dt_admissao,
            funcionario.dt_demissao,
            funcionario.status,
            funcionario.nome_usuario,
            funcionario.senha_usuario,
            funcionario.cargo,
            response.insertId,
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

  async atualizar(funcionario) {
    if (funcionario instanceof Funcionario) {
      const conexao = await conectar();
      let conn = null;

      try {
        conn = await conexao.getConnection();
        await conn.beginTransaction();
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
            funcionario.codigo,
          ]
        );
        await conn.query(
          "UPDATE funcionario SET cpf=?,dt_nasc=?,dt_admissao=?\
          ,dt_demissao=?,status=?,nome_usuario=?,senha_usuario=?,cargo_codigo=? WHERE Pessoa_codigo=?",
          [
            funcionario.cpf,
            funcionario.dt_nasc,
            funcionario.dt_admissao,
            funcionario.dt_demissao,
            funcionario.status,
            funcionario.nome_usuario,
            funcionario.senha_usuario,
            funcionario.cargo,
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
        await conn.query(
          "DELETE FROM funcionario WHERE Pessoa_codigo=?",
          funcionario.codigo
        );

        await conn.query(
          "DELETE FROM pessoa WHERE codigo=?",
          funcionario.codigo
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
      "select p.codigo, p.nome, p.telefone, p.email, p.endereco, p.bairro, \
      p.cidade, p.cep, p.uf, f.cpf, f.dt_nasc, f.dt_admissao, f.dt_demissao, \
      f.status, f.nome_usuario, f.senha_usuario, f.Cargo_codigo, c.nome as cargo_nome \
      from pessoa p \
      INNER JOIN funcionario f \
      ON f.Pessoa_codigo = p.codigo \
      INNER JOIN cargo c \
      ON c.codigo = f.Cargo_codigo \
      ORDER BY p.nome";
    const [response] = await conexao.query(sql);
    return response;
    // const listaFuncionario = [];
    // for (const row of rows) {
    //   const funcionario = new Funcionario(
    //     row["codigo"],
    //     row["cpf"],
    //     row["dt_nasc"],
    //     row["dt_admissao"],
    //     row["dt_demissao"],
    //     row["status"],
    //     row["nome_usuario"],
    //     row["senha_usuario"],
    //     row["cargo"],
    //     row["nome"],
    //     row["telefone"],
    //     row["email"],
    //     row["endereco"],
    //     row["bairro"],
    //     row["cidade"],
    //     row["cep"],
    //     row["uf"],
    //     row[""]
    //   );
    //   listaFuncionario.push(funcionario);
    // }
    // return listaFuncionario;
  }

  async consultarCargo(termo) {
    const conexao = await conectar();

    const sql =
      "select p.codigo, p.nome, p.telefone, p.email, p.endereco, p.bairro, \
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
