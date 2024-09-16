import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";

const User = sequelize.define("User", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	permissionId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "Permission",
			key: "id",
		},
	},

	createdAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},

	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},

	tableName: "users",
	timestamps: true,
});

export default User;
