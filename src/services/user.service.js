import User from "../models/user.model.js";

export async function registerUser({ first_name, last_name, email, password }) {
	return await User.create({ first_name, last_name, email, password });
}

export async function findUserByEmail(email) {
	return await User.findByEmail(email);
}

export async function validatePassword(inputPassword, storedPassword) {
	return await User.validatePassword(inputPassword, storedPassword);
}
