import Account from "./Account/account.model.js";
import Type from "./Account/type.model.js";
import Industry from "./Shop/industry.model.js";
import Shop from "./Shop/shop.model.js";
import Permission from "./User/permission.model.js";
import User from "./User/user.model.js";

Account.hasMany(Shop, { foreignKey: "accountId" });
Shop.belongsTo(Account, { foreignKey: "accountId" });

Shop.belongsTo(Industry, { foreignKey: "industryId" });
Industry.hasMany(Shop, { foreignKey: "industryId" });

Account.belongsTo(Type, { foreignKey: "typeId" });
Type.hasMany(Account, { foreignKey: "typeId" });

User.belongsTo(Permission, { foreignKey: "permissionId" });
Permission.hasMany(User, { foreignKey: "permissionId" });

export { Account, Industry, Permission, Shop, Type, User };
