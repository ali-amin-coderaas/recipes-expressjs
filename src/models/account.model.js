import pool from "../configs/database.js";
import formatResponse from "../utils/responseHelper.js";

export const Account = {
	create: async (name) => {
		const query =
			"INSERT INTO accounts (name, createdAt, updatedAt) VALUES (?, NOW(), NOW())";
		const queryParams = [name];
		const [result] = await pool.query(query, queryParams);
		return result.insertId;
	},
	getAll: async (page, pageSize) => {
		if (isNaN(page) || page < 1) page = 1;
		if (isNaN(pageSize) || pageSize < 1) pageSize = 5;

		const offset = (page - 1) * pageSize;
		const countQuery =
			"SELECT COUNT(*) AS totalItems FROM accounts a WHERE a.isActive = true";

		const [[{ totalItems }]] = await pool.query(countQuery);
		const query = `
        SELECT 
            a.*, 
            COUNT(s.id) AS shopCount 
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
        LIMIT 
            ? OFFSET ?
    `;
		const [accounts] = await pool.query(query, [
			parseInt(pageSize),
			parseInt(offset),
		]);
		return {
			items: accounts,
			totalItems,
			currentPage: page,
			pageSize,
			totalPages: Math.ceil(totalItems / pageSize),
		};
	},

	getById: async (id) => {
		const query = "SELECT * FROM accounts WHERE id = ? AND isActive = true";
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
	delete: async (id) => {
		const query = "UPDATE accounts SET isActive = false WHERE id = ?";
		const queryParams = [id];
		return await pool.query(query, queryParams);
	},
};
