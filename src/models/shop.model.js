import pool from "../configs/database.js";
export const Shop = {
	create: async (accountId, name, businessName, email) => {
		const query =
			"INSERT INTO shops (accountId, name, businessName, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())";
		const queryParams = [accountId, name, businessName, email];
		const [result] = await pool.query(query, queryParams);
		return result.insertId;
	},
	getAll: async (
		accountId,
		page = 1,
		pageSize = 5,
		searchQuery = "",
		sortBy = "createdAt",
		order = "desc"
	) => {
		page = parseInt(page, 10) || 1;
		pageSize = parseInt(pageSize, 10) || 5;
		const offset = (page - 1) * pageSize;

		// Count query for pagination
		let countQuery = `
			SELECT COUNT(*) AS totalItems 
			FROM shops s 
			WHERE s.accountId = ? 
			AND s.isActive = true
		`;
		let countParams = [parseInt(accountId)];

		// Main query for fetching shops
		let query = `
			SELECT * 
			FROM shops 
			WHERE accountId = ? 
			AND isActive = true
		`;
		let queryParams = [parseInt(accountId)];

		// Apply search filter
		if (searchQuery) {
			countQuery += " AND s.name LIKE ?";
			query += " AND name LIKE ?";
			const searchValue = `%${searchQuery}%`;
			countParams.push(searchValue);
			queryParams.push(searchValue);
		}

		// Apply sorting
		if (sortBy) {
			query += ` ORDER BY ${sortBy}`;
			if (order) {
				query += ` ${order}`;
			}
		}

		// Apply pagination
		query += " LIMIT ? OFFSET ?";
		queryParams.push(pageSize, offset);

		// Execute the count query
		const [[{ totalItems }]] = await pool.query(countQuery, countParams);

		// Execute the main query
		const [shops] = await pool.query(query, queryParams);

		// Return the paginated result
		return {
			items: shops,
			totalItems,
			currentPage: page,
			pageSize,
			totalPages: Math.ceil(totalItems / pageSize),
		};
	},

	getById: async (shopId, accountId) => {
		const query =
			"SELECT * FROM shops WHERE id = ? AND accountId = ? AND isActive = true";
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
		const query =
			"UPDATE shops SET isActive = false WHERE id = ? AND accountId = ?";
		const queryParams = [shopId, accountId];
		return await pool.query(query, queryParams);
	},
};
