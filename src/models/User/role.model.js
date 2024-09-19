import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";

const Role = sequelize.define(
	"Role",
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
		description: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: true,
		paranoid: true,
	}
);

export default Role;
