import { pool } from "../configs/database.js";

export const Shop = {
	create: async (accountId, name, businessName, email) => {
		const query =
			"INSERT INTO shops (accountId, name, businessName, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())";
		const queryParams = [accountId, name, businessName, email];
		const [result] = await pool.query(query, queryParams);
		return result.insertId;
	},
	getAll: async () => {
		const query = "SELECT * FROM shops";
		const [result] = await pool.query(query);
		return result;
	},
	getById: async (id) => {
		const query = "SELECT * FROM shops WHERE id = ?";
		const [result] = await pool.query(query, [id]);
		return result[0];
	},
	update: async (id, fieldsToUpdate) => {
		const setClause = Object.keys(fieldsToUpdate)
			.map((key) => `${key} = ?`)
			.join(", ");
		const query = `UPDATE shops SET ${setClause}, updatedAt = NOW() WHERE id = ?`;
		const queryParams = [...Object.values(fieldsToUpdate), id];
		const [result] = await pool.query(query, queryParams);
		return result;
	},
	delete: async (id) => {
		const query = "DELETE FROM shops WHERE id = ?";
		await pool.query(query, [id]);
	},
};
