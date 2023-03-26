import { User, Role } from '../database/models/index.js';

export const getRoles = async (_, res) => {
	const roles = await Role.findAll();
	res.status(200).send({
		roles
	});
};

export const getValidUsername = async (req, res) => {
	const { username } = req.params;
	const usernameAlreadyExit = await User.count({
		where: {username}
	});
	return res.status(200).send({
		isValid: !usernameAlreadyExit
	});
};