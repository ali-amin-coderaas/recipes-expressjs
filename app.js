import express from "express";
import { getRecipes, getTotal } from "./database.js";

const app = express();

app.get("/recipes", async (req, res) => {
	const searchQuery = req.query.q || "";
	const limit = req.query.limit || 30;
	const skip = req.query.skip || 0;
	const sortBy = req.query.sortBy || "";
	const order = req.query.order || "";

	const totalRecipes = await getTotal();

	const total = totalRecipes > limit ? totalRecipes : limit;

	try {
		const recipes = await getRecipes({
			searchQuery,
			limit,
			skip,
			sortBy,
			order,
		});
		res.json({recipes, total});
	} catch (error) {
		res.status(500).json({ error: "An error occured while fetching recipes" });
		console.log(error);
	}
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
