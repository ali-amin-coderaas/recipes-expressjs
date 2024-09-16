// src/models/account.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";

const Shop = sequelize.define(
	"Shop",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		accountId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "Account",
				key: "id",
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		businessName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		industryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "Industry",
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
		tableName: "shops",
		timestamps: true, 
	}
);

export default Shop;
