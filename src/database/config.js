import sequelize from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const SequelizeConfig = new sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',
		define: {
			timestamps: false,
		},
		logging: false,
	}
);

(async () => {
	try {
		await SequelizeConfig.authenticate();
		console.log('Connection to database established.');
	} catch (error) {
		console.error('Unable to connect to the database: ', error);
	}
})();

export default SequelizeConfig;
