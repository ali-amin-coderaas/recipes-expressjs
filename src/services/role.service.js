import { Permission, Role, RolePermission } from "../models/index.js";

const RoleService = {
	async getAllRolesWithPermission() {
		const roles = await Role.findAll({
			include: [
				{
					model: Permission,
					throuhg: RolePermission,
					attributes: ["name", "action"],
				},
			],
		});
	},
};

export default RoleService;
