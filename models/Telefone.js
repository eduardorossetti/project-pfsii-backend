class Telefone {
  #codigo;
  #numero;
  #pessoaId;

  constructor(codigo, numero, pessoaId) {
    this.#codigo = codigo;
    this.#numero = numero;
    this.#pessoaId = pessoaId;
  }

  get codigo() {
    return this.#codigo;
  }

  get numero() {
    return this.#numero;
  }

  set numero(numero) {
    this.#numero = numero;
  }

  get pessoaId() {
    return this.#pessoaId;
  }

  set pessoaId(pessoaId) {
    this.#pessoaId = pessoaId;
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      numero: this.#numero,
      pessoaId: this.#pessoaId,
    };
  }

  async gravar() {
    const funcionarioBD = new FuncionarioBD();
    const lastInsertedId = await funcionarioBD.gravar(this);
    return lastInsertedId;
  }

  async atualizar() {
    const funcionarioBD = new FuncionarioBD();
    await funcionarioBD.atualizar(this);
  }

  async excluir(info) {
    const funcionarioBD = new FuncionarioBD();
    await funcionarioBD.excluir(info);
  }

  async consultar() {
    const funcionarioBD = new FuncionarioBD();
    const funcionarios = await funcionarioBD.consultar();
    return funcionarios;
  }
}

export default Telefone;