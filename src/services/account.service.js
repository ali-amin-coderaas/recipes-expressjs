import Account from "../models/account.model.js";

const AccountService = {
	async getAllAccounts(page, pageSize, searchQuery, sortBy, order) {
		return await Account.findAll({
			where: {
				isActive: true,
				name: {
					[Op.like]: `%${searchQuery}%`,
				},
			},
			order: [[sortBy, order]],
			limit: pageSize,
			offset: (page - 1) * pageSize,
		});
	},

	async getAccountById(id) {
		return await Account.findByPk(id, {
			where: { isActive: true },
		});
	},

	async createAccount(data) {
		return await Account.create(data);
	},

	async updateAccount(id, data) {
		return await Account.update(data, { where: { id } });
	},

	async deleteAccount(id) {
		return await Account.update({ isActive: false }, { where: { id } });
	},
};

export default AccountService;
