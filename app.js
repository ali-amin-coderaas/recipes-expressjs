import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import { getRecipes, getTotal, registerUser } from "./src/configs/database.js";

const app = express();

app.use(express.json());
app.use(cors());

const port = 8080;

app.post("/register", async (req, res) => {
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const email = req.body.email;
	const password = req.body.password;

	if (!first_name || !last_name || !email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	await bcrypt.hash(password, 10, async (err, hash) => {
		if (err) return res.json({ Error: "Error hashing password" });

		try {
			const userId = await registerUser({
				first_name,
				last_name,
				email,
				password: hash,
			});
			return res.status(201).json({ id: userId });
		} catch (error) {
			res
				.status(500)
				.json({ error: "An error occured while registering user" });
			console.log(error);
		}
	});
});

app.get("/recipes", async (req, res) => {
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
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
