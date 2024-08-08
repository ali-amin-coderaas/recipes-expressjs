import pool from "../configs/database.js";

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
