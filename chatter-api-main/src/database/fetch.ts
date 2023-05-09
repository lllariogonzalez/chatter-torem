import fs from 'fs';
import path from 'path';
import { User, Chat, Message } from '../models';
import { ChatInterface } from '../types/Chat.types';

type DB = User[];

const dataPath: string = path.join(__dirname, '..', '..', 'data.json');

const getDatabase = (): DB => {
	const rawJSON: string = fs.readFileSync(dataPath, 'utf-8');
	return JSON.parse(rawJSON) as DB;
};

const writeDatabase = (db: DB): void => {
	fs.writeFileSync(dataPath, JSON.stringify(db));
};

export default class Database {
	/*
        USERS
    */
	static getUserByEmail(email: string): User | undefined {
		const users: DB = getDatabase();
		return users.find((user) => user.email === email);
	}

	static getUser(userId: string): User | undefined {
		const users: DB = getDatabase();
		return users.find((user) => user.userId === userId);
	}

	static deleteUser(userId: string): void {
		let users: DB = getDatabase();
		users = users.filter((user) => user.userId !== userId);
		writeDatabase(users);
	}

	static createUser(newUser: User): void {
		const users: DB = getDatabase();
		users.push(newUser);
		writeDatabase(users);
	}

	static existsUser(email: string, password: string): boolean {
		const users = getDatabase();
		const user = users.find((user) => user.email === email);
		return Boolean(user && user.password === password);
	}

	/*
        CHATS
    */
	static getUserChats(userId: string): Chat[] | undefined {
		const users = getDatabase();
		const requestedUser = users.find((user) => user.userId === userId);
		return requestedUser?.chats;
	}

	static getUserChat(userId: string, chatId: string): Chat | undefined {
		const users = getDatabase();
		const requestedUser = users.find((user) => user.userId === userId);
		return requestedUser?.chats.find((chat: ChatInterface) => chat.chatId === chatId);
	}

	static createChat(userId: string, chat: Chat): void {
		const users = getDatabase();
		users.map((user) => {
			if (user.userId === userId) {
				user.chats.push(chat);
			}
			return user;
		});
		writeDatabase(users);
	}

	static deleteChat(userId: string, chatId: string): void {
		let users: DB = getDatabase();
		users = users.map((user) => {
			if (user.userId === userId) {
				user.chats = user.chats.filter((chat: ChatInterface) => chat.chatId !== chatId);
			}
			return user;
		});
		writeDatabase(users);
	}

	static sendMessage(userId: string, chatId: string, message: Message): void {
		let users: DB = getDatabase();
		users.map((user) => {
			if (user.userId === userId) {
				user.chats = user.chats.map((chat: ChatInterface) => {
					if (chat.chatId === chatId) {
						chat.messages.push(message);
					}
					return chat;
				});
			}
			return user;
		});
		writeDatabase(users);
	}
}
