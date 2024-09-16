import Account from "./Account/account.model.js";
import Type from "./Account/type.model.js";
import Industry from "./Shop/industry.model.js";
import Shop from "./Shop/shop.model.js";
import Permission from "./User/permission.model.js";
import User from "./User/user.model.js";

Account.hasMany(Shop, { foreignKey: "accountId" });
Shop.belongsTo(Account, { foreignKey: "accountId" });

Shop.hasOne(Industry, { foreignKey: "industryId" });
Industry.belongsTo(Shop, { foreignKey: "industryId" });

Account.hasOne(Type, { foreignKey: "typeId" });
Type.belongsTo(Account, { foreignKey: "typeId" });

User.hasOne(Permission, { foreignKey: "permissionId" });
Permission.belongsTo(User, { foreignKey: "permissionId" });

export { Account, Industry, Permission, Shop, Type, User };
