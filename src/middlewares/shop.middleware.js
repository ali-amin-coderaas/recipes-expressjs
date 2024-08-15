export const validateShopData = (req, res, next) => {
	const {
		name,
		businessName,
		email,
		businessAddress,
		internalAddress,
		taxInformation,
		isActive,
	} = req.body;

	if (name && typeof name !== "string") {
		return res.status(400).json({ error: "Invalid name provided." });
	}

	if (businessName && typeof businessName !== "string") {
		return res.status(400).json({ error: "Invalid business name provided." });
	}

	if (email && !/^\S+@\S+\.\S+$/.test(email)) {
		return res.status(400).json({ error: "Invalid email provided." });
	}

	if (businessAddress && typeof businessAddress !== "string") {
		return res
			.status(400)
			.json({ error: "Invalid business address provided." });
	}

	if (internalAddress && typeof internalAddress !== "string") {
		return res
			.status(400)
			.json({ error: "Invalid internal address provided." });
	}

	if (taxInformation && typeof taxInformation !== "string") {
		return res.status(400).json({ error: "Invalid tax information provided." });
	}

	if (isActive !== undefined && typeof isActive !== "boolean") {
		return res.status(400).json({ error: "Invalid isActive value provided." });
	}

	next();
};

export default validateShopData;
