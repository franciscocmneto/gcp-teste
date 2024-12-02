require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8080;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...(process.env.INSTANCE_CONNECTION_NAME
    ? { socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` }
    : { host: process.env.DB_HOST }),
};

const connection = mysql.createConnection(dbConfig);

app.get('/', (req, res) => {
  connection.query('SELECT * from aluno', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erro ao conectar ao banco de dados.');
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`App ouvindo na porta ${port}`);
});
