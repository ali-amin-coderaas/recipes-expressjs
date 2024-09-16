import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
	process.env.MYSQL_DATABASE,
	process.env.MYSQL_USER,
	process.env.MYSQL_PASSWORD,
	{
		host: process.env.MYSQL_HOST,
		dialect: "mysql",
	}
);

export const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: process.env.MYSQL_PORT,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});
