import { handleError } from "../../utils/responseHelper.js";

// Middleware to validate the incoming request body or params
const validate = (schema, type = "body") => {
	return (req, res, next) => {
		const { error, value } = schema.validate(req[type], { abortEarly: false });
		if (error) {
			return handleError(res, 400, error, req, "Shops");
		}
		req[type] = value;
		next();
	};
};

export default validate;
