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
		const query = `
			SELECT 
				a.*, 
				COUNT(s.id) AS shop_count 
			FROM 
				accounts a
			LEFT JOIN 
				shops s 
			ON 
				a.id = s.accountId AND s.isActive = true
			WHERE 
				a.isActive = true
			GROUP BY 
				a.id
		`;
		const [result] = await pool.query(query);
		return result;
	},

	getById: async (id) => {
		const query = "SELECT * FROM accounts WHERE id = ?";
		const queryParams = [id];
		const [result] = await pool.query(query, queryParams);
		return result[0];
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
	delete: async (id, isActive) => {
		const query = "UPDATE accounts SET isActive = ? WHERE id = ?";
		const queryParams = [isActive, id];
		return await pool.query(query, queryParams);
	},
};
