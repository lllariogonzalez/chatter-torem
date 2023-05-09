import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

export interface UserDataState {
	name?: string;
	lastName?: string;
	password?: string;
	email?: string;
	photo?: string;
	userId: string;
	authToken?: string;
}

export interface ChatsState {
	chats: Chat[];
	isAllowedExpand: boolean;
}

export interface Chat {
	messages: Messages[];
	messageId: string;
	image: string;
	name: string;
}

export interface LogoType {
	src: string;
}

export interface FieldProps {
	title: string;
	placeholder: string;
	type: string;
	name: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface DropDownProps {
	getChatsData: any;
	userData: UserDataState;
	isOpen: Boolean;
}

export interface ChatsMessagesProps {
	chatId: string;
	chatsData: ChatsState;
	setUserChatData: Dispatch<SetStateAction<Chat>>;
}

export interface Messages {
	message: string;
	messageId: string;
	received: boolean;
	timeDate: string;
}

export interface SearchBarProps {
	userId: string;
	chatId: string;
}

export interface MyProfileProps {
	name?: string;
	lastName?: string;
	email?: string;
	photo?: string;
}

export interface ChatTabProps {
	name: string;
	photo: string;
	chatId: string;
	messages: Messages[];
	userData: UserDataState;
	selectedChat: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface ChatModalProps {
	isOpen: boolean;
	setIsOpen: Function;
	userData: UserDataState;
	getChatsData: any;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData {
	name: string;
	lastName: string;
	email: string;
	password: string;
}

export interface ConfirmDialogProps {
	title: string;
	text: string;
	handleOk?: any;
	handleCancel?: any;
	isOpen: boolean;
}
