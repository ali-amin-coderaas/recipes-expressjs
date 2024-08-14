const validateAccountData = (req, res, next) => {
	const { name, isActive } = req.body;

	if (name != undefined) {
		if (typeof name !== "string") {
			return res.status(400).json({ error: "Invalid name provided." });
		}
	}
	if (isActive != undefined) {
		if (typeof isActive !== "boolean" && typeof isActive !== "number") {
			return res
				.status(400)
				.json({ error: "Invalid isActive value provided." });
		}
	}

	next();
};

export default validateAccountData;
