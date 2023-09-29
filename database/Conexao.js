import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.conexao && global.conexao.state !== "disconnected") {
    return global.conexao;
  }

  const conn = mysql.createPool({
    host: "localhost",
    user: "aluno10-pfsii",
    password: "rK8xGEo9iYJVHrNmoKMg",
    database: "aprata-aluno10-pfsii",
    dateStrings: "date",
  });

  /*const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pfsii",
    dateStrings: "date",
  });*/

  global.conexao = conn;
  return conn;
}
