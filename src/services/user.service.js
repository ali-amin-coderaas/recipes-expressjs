import { Role } from "../models/index.js";
import User from "../models/User/user.model.js";

const UserService = {
	async registerUser(username, email, role, password) {
		return await User.create(
			{
				username,
				role,
				email,
				password,
			},
			{
				validate: true,
			}
		);
	},
	async findUserByEmail(email) {
		return await User.findOne({ where: { email: email } });
	},
};
