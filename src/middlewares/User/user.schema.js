const UserSchemas = {
	createUser: Joi.object({
		username: Joi.string().max(255).required(),
		role: Joi.number().integer().required(),
		email: Joi.string().email().required(),
		password: Joi.string().max(255).required(),
	}),
};

export default UserSchemas;
