import { Op } from "sequelize";
import { sequelize } from "../configs/database.js";
import { Account } from "../models/index.js";

const AccountService = {
	async getAllAccounts(page, pageSize, searchQuery, sortBy, order) {
		console.log(" get all started services");

		return await Account.findAndCountAll({
			where: {
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
		return await Account.findByPk(id);
	},

	async createAccount(data) {
		return await Account.create(data);
	},

	async updateAccount(id, data) {
		return await Account.update(data, { where: { id: id } });
	},

	async deleteAccount(id) {
		return await Account.destroy({ where: { id: id } });
	},
};

export default AccountService;
