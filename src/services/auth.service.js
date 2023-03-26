import { User, Role } from '../database/models/index.js';
import { hashSync, compareSync } from 'bcrypt';
import { generateToken, verifyToken } from '../utils/jwt.utils.js';
import sequelize from 'sequelize';

export const login = async (req, res) => {
	const { username, password } = req.body;

	const userMatched = await User.findOne({
		where: { username },
		include: [Role],
	});

	if (!userMatched) {
		return res.status(400).send({
			message: `User with ${username} not found`,
		});
	}

	if (!compareSync(password, userMatched.password)) {
		return res.status(400).send({
			message: 'Password invalid',
		});
	}

	delete userMatched.dataValues.password;

	res.status(200).send({
		token: generateToken(userMatched),
		userData: userMatched
	});
};

export const register = async (req, res) => {
	const { username, name, password, roleId } = req.body;
	try {
		await User.create({
			username,
			name,
			password: hashSync(password, 10),
			roleId,
		});

		const user = await User.findOne({
			where: { username, name },
			include: [Role],
		});

		delete user.dataValues.password;
		res.status(200).send({
			message: user,
			token: generateToken(user),
		});
	} catch (error) {
		if (error instanceof sequelize.UniqueConstraintError) {
			console.log('Error duplicate username');
			return res.status(400).send({
				message: 'Duplicate username',
			});
		}
		return res.status(400).send({
			message: 'Error ocurred',
		});
	}
};

export const validateToken = (req, res) => {
	const userToken = req.headers.authorization;

	const tokenIsValid = verifyToken(userToken);

	if (tokenIsValid) {
		res.status(200).send({
			message: 'Token is valid',
			token: userToken,
			userData: tokenIsValid.data
		});
	} else {
		res.status(400).send({
			message: 'NOT VALID TOKEN',
		});
	}
};
