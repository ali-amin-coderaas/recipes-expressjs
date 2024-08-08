import jwt from "jsonwebtoken";
import { findUserByEmail, validatePassword } from "../services/user.service.js";

const login = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	try {
		const user = findUserByEmail(email);

		if (!user) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const isValidPassword = validatePassword(password, user.password);

		if (!isValidPassword) {
			return res.status(401).json({ error: "Invalid email or password" });
		}
		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		return res.status(200).json({ token });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: "An error occurred while logging in" });
	}
};

export default { login };
