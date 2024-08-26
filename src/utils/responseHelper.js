import { v4 as uuidv4 } from "uuid";

const formatResponse = (statusCode, data, error, path, method) => {
	const startTime = Date.now();
	const totalItems = data ? data.totalItems : 0;
	const currentPage = data ? data.currentPage : 1;
	const pageSize = data ? data.pageSize : 10;
	const totalPages = Math.ceil(totalItems / pageSize);

	const response = {
		status: {
			code: statusCode,
			message: statusCode === 200 ? "OK" : "Error",
			timestamp: new Date().toISOString(),
			path,
			method,
			requestId: uuidv4(), // Example request ID
		},
		data:
			statusCode === 200
				? {
						items: data ? data.items : null,
						pagination: {
							totalItems,
							currentPage,
							pageSize,
							totalPages,
						},
						links: {
							self: `${path}?page=${currentPage}&pageSize=${pageSize}`,
							next:
								currentPage < totalPages
									? `${path}?page=${currentPage + 1}&pageSize=${pageSize}`
									: null,
							previous:
								currentPage > 1
									? `${path}?page=${currentPage - 1}&pageSize=${pageSize}`
									: null,
						},
				  }
				: null,
		error: error || null,
		meta: {
			version: "1.0.0",
			api: "Mall Insights API",
			environment: process.env.NODE_ENV || "development",
			executionTime: `${Date.now() - startTime}ms`,
		},
	};

	return response;
};

export default formatResponse;
