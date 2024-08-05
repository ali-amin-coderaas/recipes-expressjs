import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const pool = mysql
	.createPool({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
	})
	.promise();

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
		queryParams.push(parseInt(limit, 30));
	}

	if (skip) {
		query += ` OFFSET ?`;
		queryParams.push(parseInt(skip, 0));
	}

	const [rows] = await pool.query(query, queryParams);
	return { rows };
}

export async function getTotal() {
	const countQuery = "SELECT COUNT(*) as total FROM recipes";
	const [[{ total }]] = await pool.query(countQuery);
	return total;
}

console.log(await getTotal());
