import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";

const Industry = sequelize.define(
	"Industry",
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
	},
	{
		timestamps: true,
		paranoid: true,
	}
);

export default Industry;
