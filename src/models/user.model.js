import bcrypt from "bcrypt";
import pool from "../configs/database.js";
import { findUserByEmail } from "../services/user.service.js";

const User = {
	create: async ({ first_name, last_name, email, password }) => {
		const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
		const queryParams = [first_name, last_name, email, password];
		const [result] = await pool.query(query, queryParams);
		return result.insertId;
	},
	findByEmail: async (email) => {
		const query = `SELECT * 
		FROM users 
		WHERE email = ?`;

		const [rows] = await pool.query(query, email);

		return rows[0];
	},
	validatePassword: async (inputPassword, storedPassword) => {
		return await bcrypt.compare(inputPassword, storedPassword);
	},
};

export default User;
