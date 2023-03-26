import SequelizeConfig from '../config.js';
import Sequelize from 'sequelize';

const User = SequelizeConfig.define('users', {
	username: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.DataTypes.STRING,
	},
});

export default User;
