import Funcionario from "../model/Funcionario.js";
import conectar from "./Conexao.js";
import Cargo from "../model/Cargo.js";
import Atribuicao from "../model/Atribuicao.js";

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

  async obterFuncionario(codigo) {
    const conexao = await conectar();

    const sql =
      "SELECT f.codigo, p.nome, p.telefone, p.email, p.endereco, p.bairro, \
        p.cidade, p.cep, p.uf, f.cpf, f.dt_nasc, f.dt_admissao, f.dt_demissao, \
        f.status, f.nome_usuario, f.senha_usuario, f.Cargo_codigo, c.nome as cargo_nome \
        FROM pessoa p \
        INNER JOIN funcionario f \
        ON f.Pessoa_codigo = p.codigo \
        INNER JOIN cargo c \
        ON c.codigo = f.Cargo_codigo \
        WHERE f.codigo = ?";

    const [response] = await conexao.query(sql, [codigo]);

    if (response.length === 0) {
      return null;
    }

    const row = response[0];
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
    return funcionario;
  }

  async atribuir(funcionario, atribuicoes) {
    const conexao = await conectar();

    for (const atribuicao of atribuicoes) {
      const sql =
        "INSERT INTO atribuicao (funcionario_codigo, cargo_codigo, data_atribuicao, status) VALUES (?, ?, ?, ?)";

      await conexao.query(sql, [
        funcionario.codigo,
        atribuicao.codigoCargo,
        atribuicao.dataAtribuicao,
        atribuicao.status,
      ]);
    }
  }

  async obterAtribuicoes(funcionario) {
    const conexao = await conectar();

    funcionario = await this.obterFuncionario(funcionario.codigo);

    const sql = `SELECT 
                  a.codigo as codigo_atribuicao, 
                  a.data_atribuicao, 
                  a.status as status_atribuicao,
                  c.codigo as codigo_cargo,
                  c.nome as nome_cargo,
                  c.descricao as descricao_cargo
                FROM atribuicao a 
                JOIN cargo c ON a.cargo_codigo = c.codigo
                WHERE a.funcionario_codigo = ?`;

    const [atribuicoes] = await conexao.query(sql, [funcionario.codigo]);

    const atribuidos = [];

    for (const row of atribuicoes) {
      const cargo = new Cargo(
        row["codigo_cargo"],
        row["nome_cargo"],
        row["descricao_cargo"]
      );

      const atribuicao = new Atribuicao(
        row["codigo_atribuicao"],
        row["data_atribuicao"],
        row["status_atribuicao"],
        cargo
      );

      atribuidos.push(atribuicao);
    }

    funcionario.atribuicoes = atribuidos;

    return funcionario;
  }

  async atualizarAtribuicoes(atribuicoes) {
    const conexao = await conectar();

    for (const atribuicao of atribuicoes) {
      const sql =
        "UPDATE atribuicao SET data_atribuicao=?, status=? WHERE codigo=?";

      await conexao.query(sql, [
        atribuicao.dataAtribuicao,
        atribuicao.status,
        atribuicao.codigoAtribuicao,
      ]);
    }
  }

  async removerAtribuicao(atribuicoes) {
    const conexao = await conectar();

    for (const atribuicao of atribuicoes) {
      const sql = "DELETE FROM atribuicao WHERE codigo=?";

      await conexao.query(sql, [atribuicao.codigoAtribuicao]);
    }
  }
}
