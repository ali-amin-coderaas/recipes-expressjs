import pool from "../configs/database.js";
export const Shop = {
	create: async (accountId, name, businessName, email, industry) => {
		const query =
			"INSERT INTO shops (accountId, name, businessName, email,industry, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
		const queryParams = [accountId, name, businessName, email, industry];
		const [result] = await pool.query(query, queryParams);
		return result.insertId;
	},
	getAll: async (accountId, page, pageSize, searchQuery, sortBy, order) => {
		page = parseInt(page, 10) || 1;
		if (pageSize < 1) pageSize = 10;

		const offset = (page - 1) * pageSize;

		accountId = parseInt(accountId, 10);

		const countQuery = `
		SELECT COUNT(*) AS totalItems 
		FROM shops s 
		WHERE s.accountId = ?
		AND s.isActive = true 
		${searchQuery ? "AND s.name LIKE ?" : ""}
	`;
		const countParams = searchQuery
			? [accountId, `%${searchQuery}%`]
			: [accountId];
		const [[{ totalItems }]] = await pool.query(countQuery, countParams);

		let query = `
        SELECT s.* 
        FROM shops s 
        WHERE s.accountId = ? 
				AND s.isActive = true
    `;

		let queryParams = [accountId];

		if (searchQuery) {
			query += " AND s.name LIKE ?";
			queryParams.push(`%${searchQuery}%`);
		}
		if (sortBy) {
			query += ` ORDER BY ${sortBy}`;
			if (order) {
				query += ` ${order}`;
			}
		}

		query += ` LIMIT ? OFFSET ?`;
		queryParams.push(parseInt(pageSize, 10), parseInt(offset, 10));

		const [shops] = await pool.query(query, queryParams);

		return {
			items: shops,
			totalItems,
			currentPage: page,
			pageSize,
			totalPages: Math.ceil(totalItems / pageSize),
		};
	},

	getById: async (accountId, shopId) => {
		const query =
			"SELECT * FROM shops WHERE id = ? AND accountId = ? AND isActive = true";
		const [result] = await pool.query(query, [shopId, accountId]);
		return result[0];
	},
	update: async (accountId, shopId, fieldsToUpdate) => {
		if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
			throw new Error("No fields to update");
		}
		const setClause = Object.keys(fieldsToUpdate)
			.map((key) => `${key} = ?`)
			.join(", ");
		const query = `UPDATE shops SET ${setClause} WHERE id = ? AND accountId = ?`;
		const queryParams = [...Object.values(fieldsToUpdate), shopId, accountId];
		const [result] = await pool.query(query, queryParams);
		return result;
	},
	delete: async (accountId, shopId) => {
		try {
			const query =
				"UPDATE shops SET isActive = false WHERE accountId = ? AND id = ?";
			const queryParams = [shopId, accountId];

			const result = await pool.query(query, queryParams);

			return result; // or return something more meaningful if needed
		} catch (error) {
			console.error("Error updating shop:", error);
			throw error; // propagate the error
		}
	},

	getByIndustry: async () => {
		const query = `
		SELECT industry, COUNT(*) as count
		FROM shops
		WHERE isActive = true
		GROUP BY industry;
`;
		const [result] = await pool.query(query);
		return result;
	},

	getStatsByDate: async (startDate, endDate) => {
		const query = `
		SELECT 
			DATE(createdAt) as date, 
			COUNT(*) as count 
		FROM 
			shops 
		WHERE 
			isActive = true 
			AND createdAt BETWEEN ? AND ? 
		GROUP BY 
			DATE(createdAt) 
		ORDER BY 
			DATE(createdAt)
	`;
		const queryParams = [startDate, endDate];
		const [result] = await pool.query(query, queryParams);
		return result;
	},
};
