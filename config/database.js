import express from 'express';
import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
	process.env.MYSQL_SCHEMA,
	process.env.MYSQL_USERNAME,
	process.env.MYSQL_PASSWORD,
	{
		host: process.env.MYSQL_HOST,
		dialect: 'mysql',
		logging: false,
		define: {
			timestamps: false,
		},
	}
);
