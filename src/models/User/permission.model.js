import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";

const Permission = sequelize.define(
	"Permission",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
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

export default Permission;
