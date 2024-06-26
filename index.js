import express from 'express';
import {sequelize} from './config/database.js';
import dotenv from 'dotenv';
import {indexRouter} from './routes/index.js';
import {newRouter} from './routes/new.js';
import {Message} from './modules/Message.js';
import path from 'node:path';

// Config .env file
dotenv.config();

// Create instance of Express
const app = express();

const __dirname = path.resolve();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({extended: true}));

// Have the app use these routes
app.use('/', indexRouter);
app.use('/new', newRouter);

/**
 * Tries to connect to the database
 */
const authenticateDatabase = async () => {
	console.log(`Connecting to ${process.env.MYSQL_SCHEMA}..`);
	try {
		await sequelize.authenticate();
	} catch (err) {
		console.error(`Could not connect to ${process.env.MYSQL_SCHEMA}: `, err);
	}
};

/**
 * Sync all models to the database
 */
const syncModels = async () => {
	console.log(`Syncing all models..`);
	try {
		await sequelize.sync({alter: true});
	} catch (err) {
		console.error('Could not sync models to the database: ', err);
	}
};

/**
 * Populate the Message Model with sample data
 */
const populateDatabase = async () => {
	// Only populate Message model if there is no existing data.
	if ((await Message.count()) > 0) {
		return;
	}
	try {
		console.log('Populating database with sample data..');
		await Message.bulkCreate([
			{
				text: 'Hi there!',
				user: 'Amando',
				added: new Date(),
			},
			{
				text: 'Hello World!',
				user: 'Charles',
				added: new Date(),
			},
			{
				text: 'Brandyn is awesome!',
				user: 'Brandyn',
				added: new Date(),
			},
		]);
	} catch (err) {
		console.error('Could not add sample data: ', err);
	}
};

/**
 * Runs the application
 */
const run = async () => {
	// Authenitcate database
	await authenticateDatabase();

	// Sync models
	await syncModels();

	// Populate database with sample data
	await populateDatabase();

	// Run the server
	app.listen('8080', () => {
		console.log(`Server started on port 8080`);
	});
};

// Run application
run();
