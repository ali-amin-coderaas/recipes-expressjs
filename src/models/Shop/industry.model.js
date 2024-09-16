import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";

const Industry = sequelize.define("Industry", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
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
	tableName: "industries",
	timestamps: true,
});

export default Industry;
