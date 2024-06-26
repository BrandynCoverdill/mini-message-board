import {Router} from 'express';
import {messages} from './index.js';

export const newRouter = new Router();

newRouter.get('/', (req, res, next) => {
	res.render('form', {title: 'Add a new Message'});
});

newRouter.post('/', (req, res, next) => {
	const data = req.body;
	messages.push({user: data.author, text: data.text, added: new Date()});
	res.redirect('/');
	next();
});
