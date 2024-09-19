import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";

const RolePermission = sequelize.define("RolePermission", {
	roleId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	permissionId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

export default RolePermission;
