const { createPool } = require("mysql");

const pool2 = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password:"12344321"
  //connectionLimit: 10
});


module.exports = pool2; 