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
  chats: ChatTabProps[];
  isAllowedExpand: boolean;
}

export interface Chat {
  messages: Array<Messages>;
  messageIdToDisplay?: string;
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
  image: string;
  chatId: string;
  messages: Array<Messages>;
  userData?: UserDataState;
  selectedChat?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface ChatModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  userData: UserDataState;
  getChatsData: any;
}

export interface ConfirmDialogProps {
  title: string;
  text: string;
  handleOk?: any;
  handleCancel?: any;
  isOpen: boolean;
}

export enum TicketStatus {
  OPEN,
  CLOSED
}

export enum TicketPriority {
  HIGH,
  MEDIUM,
  LOW
}

export interface TicketData {
  title: string;
  description: string;
  tag: string;
  brand: string;
  id: string;
  date: Date;
  priority: TicketPriority;
  status: TicketStatus;
}

export interface TicketModalProps {
  index: number;
  isOpen: boolean;
  setIsOpen: Function;
}
