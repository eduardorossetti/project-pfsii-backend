import Funcionario from "../model/Funcionario.js";

export default class FuncionarioCTRL {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const cpf = dados.cpf;
      const dt_nasc = dados.dt_nasc;
      const dt_admissao = dados.dt_admissao;
      const dt_demissao = dados?.dt_demissao;
      const status = dados.status;
      const nome_usuario = dados.nome_usuario;
      const senha_usuario = dados.senha_usuario;
      const cargo = dados.cargo;
      const nome = dados.nome;
      const telefone = dados.telefone;
      const email = dados.email;
      const endereco = dados.endereco;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const cep = dados.cep;
      const uf = dados.uf;

      if (
        cpf &&
        dt_nasc &&
        dt_admissao &&
        status &&
        nome_usuario &&
        senha_usuario &&
        cargo &&
        nome &&
        telefone &&
        email &&
        endereco &&
        bairro &&
        cidade &&
        cep &&
        uf
      ) {
        const funcionario = new Funcionario(
          null,
          cpf,
          dt_nasc,
          dt_admissao,
          dt_demissao,
          status,
          nome_usuario,
          senha_usuario,
          cargo,
          nome,
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
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Dados gravados com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Dados insuficientes! Consulte a documentação da API.",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou Funcionario no formato JSON não fornecido! Consulte a documentação da API.",
      });
    }
  }

  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const dados = req.body;
      const codigo = dados.codigo;
      const cpf = dados.cpf;
      const dt_nasc = dados.dt_nasc;
      const dt_admissao = dados.dt_admissao;
      const dt_demissao = dados?.dt_demissao;
      const status = dados.status;
      const nome_usuario = dados.nome_usuario;
      const senha_usuario = dados.senha_usuario;
      const cargo = dados.cargo;
      const nome = dados.nome;
      const telefone = dados.telefone;
      const email = dados.email;
      const endereco = dados.endereco;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const cep = dados.cep;
      const uf = dados.uf;
      if (
        codigo &&
        cpf &&
        dt_nasc &&
        dt_admissao &&
        status &&
        nome_usuario &&
        senha_usuario &&
        cargo &&
        nome &&
        telefone &&
        email &&
        endereco &&
        bairro &&
        cidade &&
        cep &&
        uf
      ) {
        const funcionario = new Funcionario(
          codigo,
          cpf,
          dt_nasc,
          dt_admissao,
          dt_demissao,
          status,
          nome_usuario,
          senha_usuario,
          cargo,
          nome,
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
              mensagem: "Dados atualizados com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Dados insuficientes! Consulte a documentação da API.",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
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
          mensagem: "Dados excluídos com sucesso!",
        });
      })
      .catch((erro) => {
        res.status(500).json({
          status: false,
          mensagem: erro.message,
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
            mensagem: erro.message,
          });
        });
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido! Consulte a documentação da API",
      });
    }
  }
  
  consultarCargo(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const termo = req.params.termo;
      const funcionario = new Funcionario();

      funcionario
        .consultarCargo(termo)
        .then((funcionarios) => {
          res.status(200).json(funcionarios);
        })
        .catch((erro) => {
          res.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido! Consulte a documentação da API",
      });
    }
  }
}
