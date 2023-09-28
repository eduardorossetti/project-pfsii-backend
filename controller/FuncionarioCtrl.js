import Funcionario from "../model/Funcionario.js";

export default class FuncionarioCTRL {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const bairro = dados.bairro;
      const cargo = dados.cargo;
      const cep = dados.cep;
      const cidade = dados.cidade;
      const cpf = dados.cpf;
      const dataAdmissao = dados.dataAdmissao;
      const dataDemissao = dados.dataDemissao;
      const dataNascimento = dados.dataNascimento;
      const email = dados.email;
      const endereco = dados.endereco;
      const nome = dados.nome;
      const nomeUsuario = dados.nomeUsuario;
      const senhaUsuario = dados.senhaUsuario;
      const status = dados.status;
      const telefone = dados.telefone;
      const uf = dados.uf;

      if (
        bairro &&
        cargo &&
        cep &&
        cidade &&
        cpf &&
        dataAdmissao &&
        dataNascimento &&
        email &&
        endereco &&
        nome &&
        nomeUsuario &&
        senhaUsuario &&
        status &&
        telefone &&
        uf
      ) {
        const funcionario = new Funcionario(
          0,
          nome,
          cpf,
          dataNascimento,
          dataAdmissao,
          dataDemissao,
          status,
          nomeUsuario,
          senhaUsuario,
          cargo,
          telefone,
          email,
          endereco,
          bairro,
          cidade,
          cep,
          uf
        );

        funcionario
          .gravar()
          .then((lastInsertedId) => {
            res.status(200).json({
              status: true,
              message: "Dados gravados com sucesso!",
              id: lastInsertedId,
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              message: erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          message: "Dados insuficientes! Consulte a documentação da API.",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message:
          "Método não permitido ou Funcionario no formato JSON não fornecido! Consulte a documentação da API.",
      });
    }
  }

  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const dados = req.body;
      const bairro = dados.bairro;
      const cargo = dados.cargo;
      const cep = dados.cep;
      const cidade = dados.cidade;
      const codigo = dados.codigo;
      const cpf = dados.cpf;
      const dataAdmissao = dados.dataAdmissao;
      const dataDemissao = dados.dataDemissao;
      const dataNascimento = dados.dataNascimento;
      const email = dados.email;
      const endereco = dados.endereco;
      const nome = dados.nome;
      const nomeUsuario = dados.nomeUsuario;
      const senhaUsuario = dados.senhaUsuario;
      const status = dados.status;
      const telefone = dados.telefone;
      const uf = dados.uf;
      if (
        bairro &&
        cargo &&
        cep &&
        cidade &&
        codigo &&
        cpf &&
        dataAdmissao &&
        dataNascimento &&
        email &&
        endereco &&
        nome &&
        nomeUsuario &&
        senhaUsuario &&
        status &&
        telefone &&
        uf
      ) {
        const funcionario = new Funcionario(
          codigo,
          nome,
          cpf,
          dataNascimento,
          dataAdmissao,
          dataDemissao,
          status,
          nomeUsuario,
          senhaUsuario,
          cargo,
          telefone,
          email,
          endereco,
          bairro,
          cidade,
          cep,
          uf
        );
        funcionario
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              message: "Dados atualizados com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              message: erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          message: "Dados insuficientes! Consulte a documentação da API.",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message:
          "Método não permitido ou Funcionário no formato JSON não fornecido! Consulte a documentação da API",
      });
    }
  }

  excluir(req, res) {
    const codigo = req.params.codigo;
    const funcionario = new Funcionario(codigo);
    funcionario
      .excluir()
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Dados excluídos com sucesso!",
        });
      })
      .catch((erro) => {
        res.status(500).json({
          status: false,
          message: erro.message,
        });
      });
  }

  consultar(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const funcionario = new Funcionario();
      funcionario
        .consultar()
        .then((funcionarios) => {
          res.status(200).json(funcionarios);
        })
        .catch((erro) => {
          res.status(500).json({
            status: false,
            message: erro.message,
          });
        });
    } else {
      res.status(400).json({
        status: false,
        message: "Método não permitido! Consulte a documentação da API",
      });
    }
  }

  obterFuncionario(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const codigo = req.params.codigo;
      const funcionario = new Funcionario(codigo);
      funcionario
        .obterFuncionario(codigo)
        .then((funcionario) => {
          res.status(200).json(funcionario);
        })
        .catch((erro) => {
          res.status(500).json({
            status: false,
            message: erro.message,
          });
        });
    } else {
      res.status(400).json({
        status: false,
        message: "Método não permitido! Consulte a documentação da API",
      });
    }
  }

  atribuir(req, res) {
    res.type("application/json");
    if (req.method === "POST") {
      const codigoFuncionario = req.params.codigo;
      const atribuicoes = req.body.atribuicoes;

      if (codigoFuncionario && atribuicoes && atribuicoes.length > 0) {
        const funcionario = new Funcionario(codigoFuncionario);
        funcionario
          .atribuir(atribuicoes)
          .then(() => {
            res.status(200).json({
              status: true,
              message: "Cargos atribuidos com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              message: erro.message,
            });
          });
      }
    }
  }

  obterAtribuicoes(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const funcionario = new Funcionario(req.params.codigo);
      funcionario
        .obterAtribuicoes()
        .then((atribuicoes) => {
          res.status(200).json(atribuicoes);
        })
        .catch((erro) => {
          res.status(500).json({
            status: false,
            message: erro.message,
          });
        });
    }
  }

  atualizarAtribuicoes(req, res) {
    res.type("application/json");
    if (req.method === "PUT") {
      const codigoFuncionario = req.params.codigo;
      const atribuicoes = req.body.atribuicoes;

      if (codigoFuncionario && atribuicoes && atribuicoes.length > 0) {
        const funcionario = new Funcionario(codigoFuncionario);
        funcionario
          .atualizarAtribuicoes(atribuicoes)
          .then(() => {
            res.status(200).json({
              status: true,
              message: "Atribuições atualizadas com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              message: erro.message,
            });
          });
      }
    }
  }

  removerAtribuicao(req, res) {
    res.type("application/json");
    if (req.method === "DELETE") {
      const codigoFuncionario = req.params.codigo;
      const atribuicoes = req.body.atribuicoes;

      if (codigoFuncionario && atribuicoes && atribuicoes.length > 0) {
        const funcionario = new Turma(codigoFuncionario);
        funcionario
          .removerAtribuicao(atribuicoes)
          .then(() => {
            res.status(200).json({
              status: true,
              message: "Atribuição removida com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              message: erro.message,
            });
          });
      }
    }
  }
}
