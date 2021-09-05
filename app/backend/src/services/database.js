const mysql = require('mysql2');

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'shopping-list',
  password: 'docker-ansible',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connectionPool