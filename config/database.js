import express from 'express';
import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',
		port: process.env.DB_PORT || 3306,
		logging: false,
		define: {
			timestamps: false,
		},
	}
);
