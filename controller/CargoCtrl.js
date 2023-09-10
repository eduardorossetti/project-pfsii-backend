import Cargo from "../model/Cargo.js";

export default class CargoCTRL {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const nome = dados.nome;
      const descricao = dados.descricao;

      if (nome && descricao) {
        const cargo = new Cargo("", nome, descricao);
        cargo
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
          "Método não permitido ou Cargo no formato JSON não fornecido! Consulte a documentação da API.",
      });
    }
  }

  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const dados = req.body;
      const codigo = dados.codigo;
      const nome = dados.nome;
      const descricao = dados.descricao;

      if (codigo && nome && descricao) {
        const cargo = new Cargo(codigo, nome, descricao);
        cargo
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
          "Método não permitido ou Cargo no formato JSON não fornecido! Consulte a documentação da API.",
      });
    }
  }

  excluir(req, res) {
    // res.type("application/json");
    const codigo = req.params.codigo;
    const cargo = new Cargo(codigo);

    cargo
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
      const cargo = new Cargo();
      cargo
        .consultar()
        .then((cargos) => {
          res.status(200).json(cargos);
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
        mensagem: "Método não permitido! Consulte a documentação da API.",
      });
    }
  }
}
