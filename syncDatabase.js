import { sequelize } from "./src/configs/database.js";
import { Shop, Type } from "./src/models/index.js";

const createTables = async () => {
	console.log("Attempting to sync database...");
	try {
		console.log("Authenticating and establishing a connection...");
		await sequelize.authenticate();
		console.log(
			"Connection to the database has been established successfully."
		);

		console.log("Synchronizing database tables...");
		await sequelize.sync();
		console.log("Database tables synchronized successfully.");
	} catch (error) {
		console.error("Error occurred while syncing database: ", error);
	} finally {
		console.log("Closing database connection...");
		await sequelize.close(); // Close connection after syncing
		console.log("Database connection closed.");
	}
};

createTables();
