// src/models/account.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";

const Account = sequelize.define(
	"Account",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		typeId: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Personal",
			references: {
				model: "Type",
				key: "id",
			},
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "accounts",
		timestamps: true, // Automatically add createdAt and updatedAt fields
	}
);

export default Account;
