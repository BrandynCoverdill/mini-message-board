import {Router} from 'express';
import {Message} from '../modules/Message.js';

export const newRouter = new Router();

newRouter.get('/', (req, res, next) => {
	res.render('form', {title: 'Add a new Message'});
});

newRouter.post('/', async (req, res, next) => {
	const data = req.body;
	await Message.create({
		text: data.text,
		user: data.author,
	});
	res.redirect('/');
	next();
});
