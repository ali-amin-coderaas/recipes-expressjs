import bcrypt from "bcrypt";
import { findUserByEmail, registerUser } from "../services/user.service.js";

const register = async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	if (!username || !email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const existingUser = await findUserByEmail(email);
	if (existingUser) {
		return res.status(400).json({ error: "Email already in use!" });
	}

	await bcrypt.hash(password, 10, async (err, hash) => {
		if (err) return res.json({ Error: "Error hashing password" });

		try {
			const userId = await registerUser({
				username,
				email,
				password: hash,
			});
			return res.status(201).json({ id: userId });
		} catch (error) {
			res
				.status(500)
				.json({ error: "An error occured while registering user" });
			console.error(error);
		}
	});
};

export default { register };
