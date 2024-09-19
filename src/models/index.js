import Account from "./Account/account.model.js";
import Type from "./Account/type.model.js";
import Industry from "./Shop/industry.model.js";
import Shop from "./Shop/shop.model.js";
import Permission from "./User/permission.model.js";
import Role from "./User/role.model.js";
import RolePermission from "./User/rolePermission.model.js";
import User from "./User/user.model.js";

Account.hasMany(Shop, { foreignKey: "accountId" });
Shop.belongsTo(Account, { foreignKey: "accountId" });

Shop.belongsTo(Industry, { foreignKey: "industryId" });
Industry.hasMany(Shop, { foreignKey: "industryId" });

Account.belongsTo(Type, { foreignKey: "typeId" });
Type.hasMany(Account, { foreignKey: "typeId" });

// User and Role relations
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });

// Role and Permission many-to-many relationship through RolePermission
Role.belongsToMany(Permission, {
	through: RolePermission,
	foreignKey: "roleId",
});
Permission.belongsToMany(Role, {
	through: RolePermission,
	foreignKey: "permissionId",
});

export {
	Account,
	Industry,
	Permission,
	Role,
	RolePermission,
	Shop,
	Type,
	User,
};
