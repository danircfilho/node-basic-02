const mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
})

console.log('Conectado ao Banco de Dados MySQL!')

module.exports = pool