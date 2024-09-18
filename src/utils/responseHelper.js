import { v4 as uuidv4 } from "uuid";

const requestId = uuidv4();

function handleSuccess(
	res,
	statusCode,
	data,
	req,
	pagination = null,
	links = null,
	entityName = null
) {
	const startTime = req.startTime || Date.now();
	const executionTime = `${Date.now() - startTime}ms`;

	res.status(statusCode).json({
		status: {
			code: statusCode,
			message: res.statusMessage || "OK",
			timestamp: new Date().toISOString(),
			path: req.originalUrl,
			method: req.method,
			requestId: requestId || null,
		},
		data: {
			items: data.items || data,
			pagination: pagination || null,
			links: links || null,
		},
		error: null,
		meta: {
			version: "1.0.0",
			api: `${entityName} API`,
			environment: process.env.NODE_ENV || "development",
			executionTime: executionTime,
		},
	});
}

function handleError(res, statusCode, error, req, entityName) {
	const startTime = req.startTime || Date.now();
	const executionTime = `${Date.now() - startTime}ms`;

	res.status(statusCode).json({
		status: {
			code: statusCode,
			message: res.statusMessage || "An error occurred",
			timestamp: new Date().toISOString(),
			path: req.originalUrl,
			method: req.method,
			requestId: requestId || null,
		},
		data: null,
		error: {
			message: error.message || error,
			details: error.details || null,
		},
		meta: {
			version: "1.0.0",
			api: `${entityName} API`,
			environment: process.env.NODE_ENV || "development",
			executionTime: executionTime,
		},
	});
}

export { handleError, handleSuccess };
