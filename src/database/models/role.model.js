import SequelizeConfig from '../config.js';
import Sequelize from 'sequelize';

const Role = SequelizeConfig.define('roles', {
	label: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false
	},
});

export default Role;