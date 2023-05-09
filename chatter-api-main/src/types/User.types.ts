import { ChatInterface } from './Chat.types';

export interface UserInterface {
	userId: string;
	name: string;
	lastName: string;
	email: string;
	password: string;
	image: string;
	chats: ChatInterface[];
}
