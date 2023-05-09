import uniqid from 'uniqid';
import { ChatInterface } from '../types/Chat.types';
import { UserInterface } from '../types/User.types';

export class User implements UserInterface {
	userId: string;

	name: string;

	lastName: string;

	email: string;

	password: string;

	image: string;

	chats: ChatInterface[];

	constructor(name: string, lastName: string, email: string, password: string, image: string) {
		this.userId = uniqid();
		this.name = name;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.image = image;
		this.chats = [];
	}
}
