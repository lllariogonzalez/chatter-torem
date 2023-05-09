import uniqid from 'uniqid';
import { MessageInterface } from '../types/Message.types';
import { ChatInterface } from '../types/Chat.types';

export class Chat implements ChatInterface {
	chatId: string;

	name: string;

	image: string;

	messages: MessageInterface[];

	constructor(name: string, image: string) {
		this.chatId = uniqid();
		this.name = name;
		this.image = image;
		this.messages = [];
	}
}
