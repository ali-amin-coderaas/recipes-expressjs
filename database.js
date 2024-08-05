import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const pool = mysql
	.createPool({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
	})
	.promise();

export async function getRecipes({ searchQuery, limit, skip, sortBy, order }) {
	let query = "SELECT * FROM recipes";
	let queryParams = [];

	// queryParams.push(searchQuery);

	if (searchQuery) {
		query += " WHERE name LIKE ?";
		queryParams.push(`%${searchQuery}%`);
	}

	if (limit) {
		query += " LIMIT ?";
		queryParams.push(limit, 30);
	}
	if (skip) {
		query += " OFFSET ?";
		queryParams.push(skip, 0);
	}

	if (sortBy && order) {
		query += ` ORDER BY ${sortBy} ${order}`;
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
