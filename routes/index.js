import {Router} from 'express';

export const indexRouter = new Router();

export const messages = [
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
];

indexRouter.get('/', (req, res, next) => {
	res.render('index', {title: 'Mini Messageboard', messages: messages});
});
