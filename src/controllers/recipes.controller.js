import { getRecipes, getTotal } from "../configs/database.js";

const getAll = async (req, res) => {
	const searchQuery = req.query.q || "";
	const limit = req.query.limit || 30;
	const skip = req.query.skip || 0;
	const sortBy = req.query.sortBy || "";
	const order = req.query.order || "";

	try {
		const recipes = await getRecipes({
			searchQuery,
			limit: Number(limit),
			skip: Number(skip),
			sortBy,
			order,
		});
		const total = await getTotal();
		res.json({ recipes, total, skip, limit });
	} catch (error) {
		res.status(500).json({ error: "An error occured while fetching recipes" });
		console.log(error);
	}
};

export default { getAll };
