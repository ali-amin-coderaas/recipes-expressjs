import pool from "../configs/database.js";

export const Account = {
	create: async (name) => {
		const query =
			"INSERT INTO accounts (name, createdAt) VALUES (?, NOW())";
		const queryParams = [name];
		const [result] = await pool.query(query, queryParams);
		return result.insertId;
	},
	getAll: async (page, pageSize, searchQuery, sortBy, order) => {
		page = parseInt(page, 10) || 1;
		if (pageSize < 1) pageSize = 10;

		const offset = (page - 1) * pageSize;

		let query = `
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
		`;
		let queryParams = [];

		if (searchQuery) {
			query += " AND a.name LIKE ?";
			queryParams.push(`%${searchQuery}%`);
		}
		query += " GROUP BY a.id";

		if (sortBy) {
			query += ` ORDER BY ${sortBy}`;
			if (order) {
				query += ` ${order}`;
			}
		}

		query += ` LIMIT ? OFFSET ?`;
		queryParams.push(parseInt(pageSize, 10), parseInt(offset, 10));

		const countQuery = `
			SELECT COUNT(*) AS totalItems 
			FROM accounts a 
			WHERE a.isActive = true 
			${searchQuery ? "AND a.name LIKE ?" : ""}
		`;
		const countParams = searchQuery ? [`%${searchQuery}%`] : [];
		const [[{ totalItems }]] = await pool.query(countQuery, countParams);

		const [accounts] = await pool.query(query, queryParams);

		return {
			items: accounts,
			totalItems,
			currentPage: page,
			pageSize,
			totalPages: Math.ceil(totalItems / pageSize),
		};
	},

	getById: async (accountId) => {
		const query = "SELECT * FROM accounts WHERE id = ? AND isActive = true";
		const queryParams = [accountId];
		const [result] = await pool.query(query, queryParams);
		return result[0];
	},
	update: async (accountId, fieldsToUpdate) => {
		const setClause = Object.keys(fieldsToUpdate)
			.map((key) => `${key} = ?`)
			.join(", ");
		const query = `UPDATE accounts SET ${setClause} WHERE id = ?`;
		const queryParams = [...Object.values(fieldsToUpdate), accountId];
		const [result] = await pool.query(query, queryParams);
		return result;
	},
	delete: async (accountId) => {
		const query = "UPDATE accounts SET isActive = false WHERE id = ?";
		const queryParams = [accountId];
		return await pool.query(query, queryParams);
	},

	getByType: async () => {
		const query = `
      SELECT accountType, COUNT(*) as count
      FROM accounts
			WHERE isActive = true
      GROUP BY accountType
    `;
		const [result] = await pool.query(query);
		return result;
	},
};
