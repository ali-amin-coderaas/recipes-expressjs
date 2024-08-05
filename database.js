import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: process.env.MYSQL_PORT,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

export async function getRecipes({
	searchQuery,
	limit = 30,
	skip = 0,
	sortBy = "id",
	order = "asc",
}) {
	let query = "SELECT * FROM recipes";
	let queryParams = [];

	if (searchQuery) {
		query += " WHERE name LIKE ?";
		queryParams.push(`%${searchQuery}%`);
	}

	if (sortBy) {
		query += ` ORDER BY ${sortBy}`;
		if (order) {
			query += ` ${order}`;
		}
	}

	if (limit) {
		query += ` LIMIT ?`;
		queryParams.push(parseInt(limit, 10));
	}

	if (skip) {
		query += ` OFFSET ?`;
		queryParams.push(parseInt(skip, 10));
	}

	const [recipes] = await pool.query(query, queryParams);
	return { recipes };
}

export async function getTotal() {
	const countQuery = "SELECT COUNT(*) as total FROM recipes";
	const [[{ total }]] = await pool.query(countQuery);
	return total;
}
