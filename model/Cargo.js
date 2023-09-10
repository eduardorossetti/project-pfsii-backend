import CargoBD from "../database/CargoBD.js";

export default class Cargo {
  #codigo;
  #nome;
  #descricao;

  constructor(codigo, nome, descricao) {
    this.#codigo = codigo;
    this.#nome = nome;
    this.#descricao = descricao;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    this.#codigo = novoCodigo;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get descricao() {
    return this.#descricao;
  }

  set descricao(novoDescricao) {
    this.#descricao = novoDescricao;
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      nome: this.#nome,
      descricao: this.#descricao,
    };
  }

  async gravar() {
    const cargoBD = new CargoBD();
    await cargoBD.gravar(this);
  }

  async atualizar() {
    const cargoBD = new CargoBD();
    await cargoBD.alterar(this);
  }

  async excluir() {
    const cargoBD = new CargoBD();
    await cargoBD.excluir(this);
  }

  async consultar() {
    const cargoBD = new CargoBD();
    const cargos = await cargoBD.consultar();
    return cargos;
  }
}
