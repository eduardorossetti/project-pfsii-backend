import FuncionarioBD from "../database/FuncionarioBD.js";

export default class Funcionario {
  #codigo;
  #cpf;
  #dt_nasc;
  #dt_admissao;
  #dt_demissao;
  #status;
  #nome_usuario;
  #senha_usuario;
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
  ) {
    this.#codigo = codigo;
    this.#cpf = cpf;
    this.#dt_nasc = dt_nasc;
    this.#dt_admissao = dt_admissao;
    this.#dt_demissao = dt_demissao;
    this.#status = status;
    this.#nome_usuario = nome_usuario;
    this.#senha_usuario = senha_usuario;
    this.#cargo = cargo;
    this.#nome = nome;
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

  set codigo(novoCodigo) {
    this.#codigo = novoCodigo;
  }

  get cpf() {
    return this.#cpf;
  }
  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get dt_nasc() {
    return this.#dt_nasc;
  }

  set dt_nasc(novoDt_nasc) {
    this.#dt_nasc = novoDt_nasc;
  }

  get dt_admissao() {
    return this.#dt_admissao;
  }

  set dt_admissao(novoDt_admissao) {
    this.#dt_admissao = novoDt_admissao;
  }

  get dt_demissao() {
    return this.#dt_demissao;
  }

  set dt_demissao(novoDt_demissao) {
    this.#dt_demissao = novoDt_demissao;
  }

  get status() {
    return this.#status;
  }

  set status(novoStatus) {
    this.#status = novoStatus;
  }

  get nome_usuario() {
    return this.#nome_usuario;
  }

  set nome_usuario(novoNome_usuario) {
    this.#nome_usuario = novoNome_usuario;
  }

  get senha_usuario() {
    return this.#senha_usuario;
  }

  set senha_usuario(novoSenha_usuario) {
    this.#senha_usuario = novoSenha_usuario;
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
      dt_nasc: this.#dt_nasc,
      dt_admissao: this.#dt_admissao,
      dt_demissao: this.#dt_demissao,
      status: this.#status,
      nome_usuario: this.#nome_usuario,
      senha_usuario: this.#senha_usuario,
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
    await funcionarioBD.gravar(this);
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
