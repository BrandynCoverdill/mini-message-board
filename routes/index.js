import {Router} from 'express';
import {Message} from '../modules/Message.js';

export const indexRouter = new Router();

indexRouter.get('/', async (req, res, next) => {
	try {
		const messages = await Message.findAll();
		res.render('index', {title: 'Mini Messageboard', messages: messages});
	} catch (err) {
		console.error('Failed to retrieve messages: ', err);
		res.status(500).send('Error retrieving messages from the database.');
	}
});
