const mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({
  connectionLimit: process.env.DB_CON_LIM,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
})

console.log('Conectado ao Banco de Dados MySQL!')

module.exports = pool