import uniqid from 'uniqid';
import { MessageInterface } from '../types/Message.types';

export class Message implements MessageInterface {
	messageId: string;

	message: string;

	timeDate: string;

	received: boolean;

	constructor(message: string, received: boolean) {
		this.messageId = uniqid();
		this.message = message;
		this.timeDate = new Date().toISOString();
		this.received = received;
	}
}
