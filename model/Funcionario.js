import FuncionarioBD from "../database/FuncionarioBD.js";

export default class Funcionario {
  #codigo;
  #cpf;
  #dataNascimento;
  #dataAdmissao;
  #dataDemissao;
  #status;
  #nomeUsuario;
  #senhaUsuario;
  #cargo;
  #nome;
  #telefone;
  #email;
  #endereco;
  #bairro;
  #cidade;
  #cep;
  #uf;

  constructor(
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
  ) {
    this.#codigo = codigo;
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dataNascimento;
    this.#dataAdmissao = dataAdmissao;
    this.#dataDemissao = dataDemissao;
    this.#status = status;
    this.#nomeUsuario = nomeUsuario;
    this.#senhaUsuario = senhaUsuario;
    this.#cargo = cargo;
    this.#telefone = telefone;
    this.#email = email;
    this.#endereco = endereco;
    this.#bairro = bairro;
    this.#cidade = cidade;
    this.#cep = cep;
    this.#uf = uf;
  }

  get codigo() {
    return this.#codigo;
  }

  get cpf() {
    return this.#cpf;
  }
  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get dataNascimento() {
    return this.#dataNascimento;
  }

  set dataNascimento(novoDataNascimento) {
    this.#dataNascimento = novoDataNascimento;
  }

  get dataAdmissao() {
    return this.#dataAdmissao;
  }

  set dataAdmissao(novoDataAdmissao) {
    this.#dataAdmissao = novoDataAdmissao;
  }

  get dataDemissao() {
    return this.#dataDemissao;
  }

  set dataDemissao(novoDataDemissao) {
    this.#dataDemissao = novoDataDemissao;
  }

  get status() {
    return this.#status;
  }

  set status(novoStatus) {
    this.#status = novoStatus;
  }

  get nomeUsuario() {
    return this.#nomeUsuario;
  }

  set nomeUsuario(novoNomeUsuario) {
    this.#nomeUsuario = novoNomeUsuario;
  }

  get senhaUsuario() {
    return this.#senhaUsuario;
  }

  set senhaUsuario(novoSenhaUsuario) {
    this.#senhaUsuario = novoSenhaUsuario;
  }

  get cargo() {
    return this.#cargo;
  }

  set cargo(novoCargo) {
    this.#cargo = novoCargo;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get endereco() {
    return this.#endereco;
  }

  set endereco(novoEndereco) {
    this.#endereco = novoEndereco;
  }

  get bairro() {
    return this.#bairro;
  }

  set bairro(novoBairro) {
    this.#bairro = novoBairro;
  }

  get cidade() {
    return this.#cidade;
  }

  set cidade(novoCidade) {
    this.#cidade = novoCidade;
  }

  get cep() {
    return this.#cep;
  }

  set cep(novoCep) {
    this.#cep = novoCep;
  }

  get uf() {
    return this.#uf;
  }

  set uf(novoUf) {
    this.#uf = novoUf;
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      cpf: this.#cpf,
      dataNascimento: this.#dataNascimento,
      dataAdmissao: this.#dataAdmissao,
      dataDemissao: this.#dataDemissao,
      status: this.#status,
      nomeUsuario: this.#nomeUsuario,
      senhaUsuario: this.#senhaUsuario,
      cargo: this.#cargo,
      nome: this.#nome,
      telefone: this.#telefone,
      email: this.#email,
      endereco: this.#endereco,
      bairro: this.#bairro,
      cidade: this.#cidade,
      cep: this.#cep,
      uf: this.#uf,
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

  async excluir() {
    const funcionarioBD = new FuncionarioBD();
    await funcionarioBD.excluir(this);
  }

  async consultar() {
    const funcionarioBD = new FuncionarioBD();
    const funcionarios = await funcionarioBD.consultar();
    return funcionarios;
  }

  async consultarCargo(termo) {
    const funcionarioBD = new FuncionarioBD();
    const funcionarios = await funcionarioBD.consultarCargo(termo);
    return funcionarios;
  }
}
