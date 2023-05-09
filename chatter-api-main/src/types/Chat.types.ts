import { MessageInterface } from './Message.types';

export interface ChatInterface {
	chatId: string;
	name: string;
	image: string;
	messages: MessageInterface[];
}
