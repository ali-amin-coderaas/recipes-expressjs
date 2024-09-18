import Joi from "joi";

// Define the validation schemas for the various shop operations
const shopSchemas = {
	getAllShops: Joi.object({
		accountId: Joi.number().integer().required(),
		page: Joi.number().integer().min(1).default(1),
		pageSize: Joi.number().integer().min(1).default(10),
		searchQuery: Joi.string().allow("").optional(),
		sortBy: Joi.string()
			.valid("name", "businessName", "email", "industry", "createdAt")
			.default("createdAt"),
		order: Joi.string().valid("ASC", "DESC").default("ASC"),
	}),

	getShopById: Joi.object({
		shopId: Joi.number().integer().required(),
		accountId: Joi.number().integer().required(),
	}),

	createShop: Joi.object({
		accountId: Joi.number().integer().required(),
		name: Joi.string().max(255).required(),
		businessName: Joi.string().max(255).required(),
		email: Joi.string().email().required(),
		industry: Joi.string().max(255).required(),
	}),

	updateShop: Joi.object({
		accountId: Joi.number().integer().required(),
		shopId: Joi.number().integer().required(),
		data: Joi.object({
			name: Joi.string().max(255).optional(),
			businessName: Joi.string().max(255).optional(),
			email: Joi.string().email().optional(),
			industry: Joi.string().max(255).optional(),
		}).min(1), // At least one field is required to update
	}),
};

export default shopSchemas;
