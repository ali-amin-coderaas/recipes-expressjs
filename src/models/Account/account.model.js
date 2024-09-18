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
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
	},
	{
		timestamps: true,
		paranoid: true,
	}
);

export default Account;
