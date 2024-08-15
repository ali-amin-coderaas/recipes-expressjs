import pool from "../configs/database.js";
export const Shop = {
	create: async (accountId, name, businessName, email) => {
		const query =
			"INSERT INTO shops (accountId, name, businessName, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())";
		const queryParams = [accountId, name, businessName, email];
		const [result] = await pool.query(query, queryParams);
		return result.insertId;
	},
	getAll: async (accountId) => {
		const query = "SELECT * FROM shops WHERE accountId = ?";
		const [result] = await pool.query(query, [accountId]);
		return result;
	},
	getById: async (shopId, accountId) => {
		const query = "SELECT * FROM shops WHERE id = ? AND accountId = ?";
		const [result] = await pool.query(query, [shopId, accountId]);
		return result[0];
	},
	update: async (shopId, accountId, fieldsToUpdate) => {
		if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
			throw new Error("No fields to update");
		}
		const setClause = Object.keys(fieldsToUpdate)
			.map((key) => `${key} = ?`)
			.join(", ");
		const query = `UPDATE shops SET ${setClause}, updatedAt = NOW() WHERE id = ? AND accountId = ?`;
		const queryParams = [...Object.values(fieldsToUpdate), shopId, accountId];
		const [result] = await pool.query(query, queryParams);
		return result;
	},
	delete: async (shopId, accountId) => {
		const query = "DELETE FROM shops WHERE id = ? AND accountId = ?";
		return await pool.query(query, [shopId, accountId]);
	},
};
