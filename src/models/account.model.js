import pool from "../configs/database.js";

export const Account = {
	create: async (name, isActive, createdAt, updatedAt) => {
		const query =
			"INSERT INTO accounts (name, isActive, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())";
		const queryParams = [name, isActive, createdAt, updatedAt];
		const [result] = await pool.query(query, queryParams);
		return result.insertId;
	},
	getAll: async () => {
		const query = "SELECT * FROM accounts";
		const [result] = await pool.query(query);
		return result;
	},
	getById: async (id) => {
		const query = "SELECT * FROM accounts WHERE id = ?";
		const queryParams = [id];
		const [result] = await pool.query(query, queryParams);
		return result;
	},
	update: async (id, fieldsToUpdate) => {
		const setClause = Object.keys(fieldsToUpdate)
			.map((key) => `${key} = ?`)
			.join(", ");
		const query = `UPDATE accounts SET ${setClause}, updatedAt = NOW() WHERE id = ?`;
		const queryParams = [...Object.values(fieldsToUpdate), id];
		const [result] = await pool.query(query, queryParams);
		return result;
	},
	delete: async (id) => {
		const query = "DELETE FROM accounts WHERE id = ?";
		return await pool.query(query, [id]);
	},
};
