import Joi from "joi";

// Schema for validating Account ID
const accountIdSchema = Joi.object({
	accountId: Joi.number().integer().required(),
});

const accountQuerySchema = Joi.object({
	page: Joi.number().integer().min(1).default(1),
	pageSize: Joi.number().integer().min(1).default(10),
	q: Joi.string().allow(""),
	sortBy: Joi.string().valid("name", "createdAt", "updatedAt").default("name"), // adjust based on valid fields
	order: Joi.string().valid("ASC", "DESC").default("ASC"),
});

// Schema for creating a new account
const createAccountSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	accountType: Joi.string()
		.valid("Personal", "Non-Profit", "Business")
		.required(),
	//Other fields go here
});

// Schema for updating an account
const updateAccountSchema = Joi.object({
	name: Joi.string().min(3).max(50).optional(),
	accountType: Joi.string()
		.valid("Personal", "Non-Profit", "Business")
		.optional(),
	//Other fields go here
});

const validateAccountQuery = (req, res, next) => {
	const { error, value } = accountQuerySchema.validate(req.query);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	// Update request query with validated values
	req.query = value;
	next();
};

// Validation middleware for account creation
const validateCreateAccount = (req, res, next) => {
	const { error } = createAccountSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

// Validation middleware for fetching an account by ID
const validateAccountId = (req, res, next) => {
	const { error } = accountIdSchema.validate(req.params);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

// Validation middleware for updating an account
const validateUpdateAccount = (req, res, next) => {
	// Validate both the accountId in params and the body data
	const { error: paramError } = accountIdSchema.validate(req.params);
	const { error: bodyError } = updateAccountSchema.validate(req.body);

	if (paramError) {
		return res.status(400).json({ error: paramError.details[0].message });
	}

	if (bodyError) {
		return res.status(400).json({ error: bodyError.details[0].message });
	}

	next();
};

// Validation middleware for deleting an account (just validate accountId)
const validateDeleteAccount = (req, res, next) => {
	const { error } = accountIdSchema.validate(req.params);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

export default {
	validateAccountQuery,
	validateCreateAccount,
	validateAccountId,
	validateUpdateAccount,
	validateDeleteAccount,
};
