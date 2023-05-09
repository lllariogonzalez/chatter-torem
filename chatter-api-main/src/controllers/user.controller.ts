import jwt from 'jsonwebtoken';

import database from '../database/fetch';
import { User } from '../models/User';
import { emitSocket } from '../socket';
import { StatusError } from '../types/StatusError';

const { sign } = jwt;

/*
    USERS CONTROLLERS
*/

export const getUser = (req, res, next): void => {
	if (!req.user) {
		const statusError = new StatusError('Unauthorized action', 401);
		return next(statusError);
	}

	try {
		const user = database.getUser(req.user);
		if (!user) {
			const statusError = new StatusError('User not found', 404);
			return next(statusError);
		}

		return res.status(200).json(user);
	} catch (error) {
		const statusError = new StatusError('Error while fetching data', 500);
		return next(statusError);
	}
};

export const deleteUser = (req, res, next): void => {
	if (!req.user) {
		const statusError = new StatusError('Unauthorized action', 401);
		return next(statusError);
	}

	try {
		database.deleteUser(req.user);

		emitSocket('users', { action: 'delete', userId: req.user });

		return res.status(201).json({ message: 'User deleted successfully' });
	} catch (error) {
		const statusError = new StatusError('Error while fetching data', 500);
		return next(statusError);
	}
};

export const createUser = (req, res, next): void => {
	const { name, lastName, email, password } = req.body;
	const image = req.file?.path;

	if (!image) {
		const statusError = new StatusError('Missing image file', 422);
		return next(statusError);
	}

	if (!validAttributes(name, lastName, email, password, image)) {
		return res.status(400).json({
			message: 'Bad Request: Make sure all attributes and their types are OK',
			attributes: { name, lastName, email, password },
		});
	}

	try {
		if (database.getUserByEmail(email)) {
			const statusError = new StatusError('User already registered', 409);
			return next(statusError);
		}

		const user: User = new User(name, lastName, email, password, image);

		database.createUser(user);

		emitSocket('users', { action: 'register', userId: user.userId });

		return res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		const statusError = new StatusError('Error while fetching data', 500);
		return next(statusError);
	}
};

export const logInUser = (req, res, next): void => {
	const { email, password } = req.body;

	if (!validAttributes('x', 'x', email, password, 'x')) {
		return res.status(400).json({
			message: 'Bad Request: Make sure all attributes and their types are OK',
			attributes: { email, password },
		});
	}

	try {
		const ok = database.existsUser(email, password);
		if (!ok) {
			return res.status(401).json({ message: 'Incorrect email or password' });
		}

		const { userId } = database.getUserByEmail(email) as User;
		const token = sign(
			{
				userId,
			},
			'toremsoftware',
			{ expiresIn: '1h' }
		);

		return res.status(201).json({ message: 'Logged In successfully', userId, token });
	} catch (error) {
		const statusError = new StatusError('Error while fetching data', 500);
		return next(statusError);
	}
};

const validAttributes = (email: any, password: any, name?: any, lastName?: any, image?: any) => {
	return (
		typeof email == 'string' &&
		typeof password == 'string' &&
		(name ?? typeof name == 'string') &&
		(lastName ?? typeof lastName == 'string') &&
		(image ?? typeof image == 'string')
	);
};
