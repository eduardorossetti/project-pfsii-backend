import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.conexao && global.conexao.state !== "disconnected") {
    return global.conexao;
  }

  const conn = mysql.createPool({
    host: "localhost",
    user: "aluno10-pfsii",
    password: "6eqrmzAGmMMT897N5t4m",
    database: "new-aprata-aluno10",
    dateStrings: "date",
  });

  /*const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "new-aprata-aluno10",
    dateStrings: "date",
  });*/

  global.conexao = conn;
  return conn;
}
