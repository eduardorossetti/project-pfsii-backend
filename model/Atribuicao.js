export default class Atribuicao {
  #codigo;
  #dataAtribuicao;
  #status;
  #cargo;
  constructor(codigo, dataAtribuicao, status, cargo) {
    this.#codigo = codigo;
    this.#dataAtribuicao = dataAtribuicao;
    this.#status = status;
    this.#cargo = cargo;
  }

  get codigo() {
    return this.#codigo;
  }
  set codigo(codigo) {
    this.#codigo = codigo;
  }
  get dataAtribuicao() {
    return this.#dataAtribuicao;
  }
  set dataAtribuicao(dataAtribuicao) {
    this.#dataAtribuicao = dataAtribuicao;
  }
  get status() {
    return this.#status;
  }
  set status(status) {
    this.#status = status;
  }
  get cargo() {
    return this.#cargo;
  }
  set cargo(cargo) {
    this.#cargo = cargo;
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      dataAtribuicao: this.#dataAtribuicao,
      status: this.#status,
      cargo: this.#cargo,
    };
  }
}
