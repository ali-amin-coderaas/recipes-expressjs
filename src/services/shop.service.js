import { Shop } from "../models/index.js";
const ShopService = {
	async getAllShops(accountId, page, pageSize, searchQuery, sortBy, order) {
		return await Shop.findAndCountAll({
			where: {
				accountId: accountId,
				name: {
					[Op.like]: `%${searchQuery}%`,
				},
			},
			order: [[sortBy, order]],
			limit: pageSize,
			offset: (page - 1) * pageSize,
		});
	},

	async getShopById(shopId, accountId) {
		return await Shop.findByPk(shopId, { where: { accountId: accountId } });
	},

	async createShop(accountId, name, businessName, email, industry) {
		return await Shop.create(
			{
				name: name,
				businessName: businessName,
				email: email,
				industry: industry,
			},
			{
				where: { accountId: accountId },
			}
		);
	},

	async updateShop(accountId, shopId, data) {
		return await Shop.update(data, {
			where: { accountId: accountId, id: shopId },
		});
	},

	async deleteShop(accountId, shopId) {
		return await Shop.destroy({ where: { accountId: accountId, id: shopId } });
	},
};

export default ShopService;
