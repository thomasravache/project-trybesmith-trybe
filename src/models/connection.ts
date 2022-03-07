import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;

const connection = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: 'Trybesmith',
});

export default connection;
